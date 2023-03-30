import axios from '@/utils/axios'
import Head from 'next/head'
import Link from 'next/link';
import {useState} from "react";
import {UserList} from "@/interfaces/user";
import {useUser} from "@/hooks/user";

export default function Home() {
    const {users} = useUser();

    const userList = (users: any) => {
        return users && users.data && users.data.map((user: UserList) =>
            <tr key={user.id}>
              <td className="border px-4 py-2">{ user.name }</td>
              <td className="border px-4 py-2">{ user.email }</td>
              <td className="border px-4 py-2">
                <img src={ user.profile_photo_url } alt="Profile Picture"/>
              </td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Delete
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2">
                  Edit
                </button>
              </td>
            </tr>
        );
    }
  return (
    <>
      <Head>
        <title>PGL CRUD App</title>
      </Head>
      <main className="flex flex-col justify-center p-16">
          <section className="flex justify-between items-center">
            <h1 className="text-3xl text-gray-500 font-bold">
              Users Management
            </h1>
            <Link href="user/create" className="rounded-lg p-4 bg-blue-500 text-white">
              Create User
            </Link>
          </section>
          <section className="my-4">
            <table className="w-full table-auto">
              <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Profile Picture</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {userList(users)}
              </tbody>
            </table>
          </section>
      </main>
    </>
  )
}
