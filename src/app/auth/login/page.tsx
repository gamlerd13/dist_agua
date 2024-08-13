"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { JSX, SVGProps, useState } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res && res.error) {
      setError(res.error);
    } else {
      router.push("/");
      router.refresh();
    }
    reset();
  });

  return (
    <div className="flex items-center justify-center min-h-screen sm:px-6 lg:px-8 ">
      <Card className="w-full max-w-md">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>Ingrese su correo y contraseña.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                placeholder="juanperez"
                type="text"
                {...register("username", {
                  required: {
                    value: true,
                    message: "El usuario es requerido",
                  },
                  onChange: (e) => setError(null),
                })}
              />
              {errors.username && (
                <span className="text-red-500 text-xs">
                  {errors.username?.message?.toString()}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password?.message?.toString()}
                </span>
              )}
            </div>
            {error && (
              <span className="text-rose-500 text-sm">
                Usuario o contraseña incorrecto
              </span>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button className="w-full">Ingresar</Button>
            <Link href="/auth" className="ml-4" prefetch={false}>
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function ArrowLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
  );
}
