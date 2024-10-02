import db from '../src/lib/db';
import { Resend } from 'resend';
import cron from 'node-cron';

const resend = new Resend(process.env.RESEND_API_KEY);

export function scheduler() {
  // * * * * * -> pruebas: para ejecutar cada minuto
  // 0 0 25 * * ->  // se ejecutará cada 25 a las 00:00
  cron.schedule('0 0 25 * *', async () => {
    console.log("scheduler ejecutado")
    const clientesFaltantes: Cliente[] = [];

    const clientes = await db.cliente.findMany({
      where: { isActive: true },
      include: { sale: true }
    });
    const hoy = new Date();
    console.log("Hoy es", hoy);
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();
    const fechaInicio = new Date(anioActual, mesActual - 1, 25);

    console.log("Verificando pedidos desde el", fechaInicio, "hasta el", hoy);
    for (const cliente of clientes) {
      const pedidosUltimoMes = await db.sale.count({
        where: {
          clientId: cliente.id,
          saleDate: { gte: fechaInicio, lt: hoy }
        }
      });

      if (pedidosUltimoMes < cliente.pedidoConcurrencia) {
        clientesFaltantes.push({
          nombre: `${cliente.nombres} ${cliente.apellidos}`,
          pedidosRealizados: pedidosUltimoMes,
          pedidosEsperados: cliente.pedidoConcurrencia,
          telefono: cliente.telefono,
        });
      }
    }

    if (clientesFaltantes.length > 0) {
      await sendNotification(clientesFaltantes);
    }
  });
}

interface Cliente {
  nombre: string;
  telefono: string,
  pedidosRealizados: number;
  pedidosEsperados: number;
}

async function sendNotification(clientesFaltantes: Cliente[]) {
  try {
    const emailBody = generateEmailBody(clientesFaltantes);

    await resend.emails.send({
      from: 'Distribuidora de Agua <onboarding@resend.dev>',
      to: 'psulcasanchez@gmail.com',
      subject: 'Alerta: Clientes con pedidos faltantes',
      html: emailBody
    });
    console.log('Correo enviado con la lista de clientes faltantes');
  } catch (error) {
    console.error('Error enviando alerta:', error);
  }
}

// Añadir tipado a 'clientesFaltantes' en la función generateEmailBody
function generateEmailBody(clientesFaltantes: Cliente[]) {
  const rows = clientesFaltantes.map(cliente => `
    <tr>
      <td>${cliente.nombre}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.pedidosRealizados}</td>
      <td>${cliente.pedidosEsperados}</td>
    </tr>
  `).join('');

  return `
    <h1>Clientes que no han alcanzado sus pedidos esperados</h1>
    <p>A continuación se muestra una lista de los clientes que no han alcanzado el número de pedidos esperado en las últimas 2 semanas:</p>
    <table border="1" cellpadding="10" cellspacing="0">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Teléfono</th>
          <th>Pedidos Realizados</th>
          <th>Pedidos Esperados</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}