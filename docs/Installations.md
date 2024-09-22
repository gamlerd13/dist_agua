## Configuración del Proyecto

Este proyecto se puede manejar utilizando `npm`, `yarn`, o `pnpm`. Para usar `pnpm`, sigue los siguientes pasos:

1. Instalar pnpm globalmente (si no lo tienes ya instalado):
   ```bash
   npm install -g pnpm
   ```

2. Instalar las dependencias:
   ```bash
   pnpm install
   ```

**Nota:** Si prefieres usar `npm` o `yarn`, simplemente ejecuta `npm install` o `yarn install` en lugar de `pnpm install`.

---
### **Guía para Borrar e Reinstalar Módulos al Intercambiar Gestor de Paquetes**

Si necesitas cambiar el gestor de paquetes en tu proyecto (por ejemplo, de `npm` a `yarn` o `pnpm`), sigue estos pasos sencillos para asegurar una instalación limpia de las dependencias.

#### **Paso 1: Eliminar la Carpeta `node_modules`**

La carpeta `node_modules` contiene todas las dependencias instaladas en tu proyecto. Para evitar conflictos y garantizar que las dependencias se gestionen correctamente con el nuevo gestor de paquetes, elimina esta carpeta:

- **En Mac/Linux:**

  ```bash
  rm -rf node_modules
  ```

- **En Windows:**

  ```bash
  rmdir /s /q node_modules
  ```

#### **Paso 2: Eliminar el Archivo de Bloqueo (Opcional)**

Cada gestor de paquetes crea un archivo de bloqueo que garantiza la instalación de versiones específicas de las dependencias. Si cambias de gestor de paquetes, es recomendable eliminar el archivo de bloqueo actual:

- **Para `npm` (`package-lock.json`):**

  ```bash
  rm package-lock.json
  ```

- **Para `yarn` (`yarn.lock`):**

  ```bash
  rm yarn.lock
  ```

- **Para `pnpm` (`pnpm-lock.yaml`):**

  ```bash
  rm pnpm-lock.yaml
  ```

#### **Paso 3: Reinstalar las Dependencias con el Nuevo Gestor de Paquetes**

Una vez que hayas eliminado `node_modules` y el archivo de bloqueo, instala las dependencias utilizando el nuevo gestor de paquetes:

- **Si usas `npm`:**

  ```bash
  npm install
  ```

- **Si usas `yarn`:**

  ```bash
  yarn install
  ```

- **Si usas `pnpm`:**

  ```bash
  pnpm install
  ```

Esto creará una nueva carpeta `node_modules` y un nuevo archivo de bloqueo asociado al gestor de paquetes que estás utilizando.

### **Resumen**

1. **Eliminar la carpeta `node_modules`.**
2. **Eliminar el archivo de bloqueo anterior (opcional, pero recomendado).**
3. **Reinstalar las dependencias con el nuevo gestor de paquetes.**

Siguiendo estos pasos, aseguras una transición suave y limpia al cambiar entre gestores de paquetes.