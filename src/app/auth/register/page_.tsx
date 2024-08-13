"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Select,
} from "@/components/ui/select"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { useRouter } from "next/navigation"

import Link from "next/link"
import { JSX, SVGProps} from 'react'



const formSchema = z
    .object({
        username: z.string().nonempty({ message: "El nombre de usuario es requerido" }),
        email: z.string().email({ message: "Correo inválido" }),
        password: z
            .string()
            .min(3, { message: "La contraseña debe tener al menos 3 caracteres" })
            .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
            .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
            .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" }),
        passwordConfirm: z.string(),
        typeUser: z.enum(["admin", "carrier", "assistant"], {
            required_error: "El tipo de usuario es requerido",
        }),
    })
    .refine(
        (data) => {
            return data.password === data.passwordConfirm;
        },
        {
            message: "Las contraseñas no coinciden",
            path: ["passwordConfirm"],
        }
    )


export default function Home() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const typeUser = form.watch("typeUser");

    const router = useRouter()

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(
                    {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        typeUser: values.typeUser,
                    }
                ),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                router.push('/auth/login')
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen px-4 py-8 sm:px-4 lg:px-6">
            <Card className="w-full max-w-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="max-w-md w-full flex flex-col gap-2"
                    >
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Registro</CardTitle>
                            <CardDescription>Crea un nuevo usuario</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Usuario</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="juanperez"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Correo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="juan@gmail.com"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="typeUser"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Tipo de usuario</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un tipo de usuario" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="admin">Administrador</SelectItem>
                                                    <SelectItem value="carrier">Transportista</SelectItem>
                                                    <SelectItem value="assistant">Asistente</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Contraseña" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Confirmar contraseña</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Confirmar contraseña"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Registrar
                            </Button>
                            <Link
                                href="/auth"
                                className="ml-4"
                                prefetch={false}
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </Link>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </main>
    );
}

function ArrowLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    )
  }