import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {useUser} from "@/hooks/user";
import axios from "@/utils/axios";
import {useRouter} from "next/router";
export default function CreateUserForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<File | undefined>()
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25,
    });
    const {store} = useUser();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        store({
            name,
            email,
            password,
            photo: image,
        });
    }
    // Image Handlers
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files && files[0]) {
        setImage(files[0])
      }
    }
  
    const handleCropChange = (crop: Crop) => {
      setCrop(crop)
    }
    return (
        <>
            <main className="flex flex-col justify-center p-16">
                <form onSubmit={handleSubmit} className="px-48">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                        id="name"
                        type="text"
                        placeholder="e.g John Doe"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            required={true}
                            placeholder="e.g you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="e.g mysecurepassword"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                        Profile Picture
                        </label>
                        {image && (
                            <ReactCrop
                                       crop={crop}
                                       onChange={handleCropChange}
                                       aspect={1}
                                       className="w-44 h-44 bg-cover object-cover mb-4 shadow appearance-none border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <img src={URL.createObjectURL(image)}  alt="Image"/>
                            </ReactCrop>
                        )}
                        <br/>
                        <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </form>
            </main>
        </>
    )
}