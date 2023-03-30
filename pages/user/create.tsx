import CreateUserForm from "@/components/user/create";
import Head from "next/head";
import Link from "next/link";

export default function CreateUser() {
    return (
        <>
        <Head>
            <title>Create User Form</title>
        </Head>
          <main className="flex flex-col justify-center p-16">
            <section className="flex justify-between items-center">
                <h1 className="text-3xl text-gray-500 font-bold">
                Create New User
                </h1>
                <Link href="/" className="rounded-lg px-4 py-2 bg-blue-500 text-white">
                Back to Users List
                </Link>
            </section>
            <CreateUserForm/>
          </main>
        </>
    )
}