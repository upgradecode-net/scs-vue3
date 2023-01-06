<script setup>
import { useCollection } from 'vuefire'
import {
    ref
} from "vue"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

import Sidebar from "../components/Sidebar.vue"


const todos = useCollection(collection(db, 'users'))
const agregarEmpleadoModal = ref(true);

const nombre = ref("")
const apellido = ref("")
const email = ref("")
const whatsapp = ref("")

const agregarDatos = async (payload) => {
    console.log("Funcionando")
    try {
        const docRef = await addDoc(collection(db, "users"), {
            nombre: payload.nombre,
            apellido: payload.apellido,
            email: payload.email,
            whatsapp: payload.whatsapp

        });

        nombre.value = ""
        apellido.value = ""
        email.value = ""
        whatsapp.value = ""

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
</script>

<template>
    <div class=" ">
        <Sidebar></Sidebar>

        <!-- Modal toggle -->

        <!-- Main modal -->

        <div v-if="agregarEmpleadoModal" id="defaultModal" aria-hidden="true"
            class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Agregar empleado
                        </h3>
                        <button @click="agregarEmpleadoModal = !agregarEmpleadoModal" type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>

                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <div id="" class="relative z-0 w-full mb-6 group">
                            <input type="email" name="floating_email" id="floating_email"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required />
                            <label for="floating_email"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Nombre</label>
                        </div>

                        <div id="" class="relative z-0 w-full mb-6 group">
                            <input type="email" name="floating_email" id="floating_email"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required />
                            <label for="floating_email"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Apellido</label>
                        </div>

                        <div id="" class="relative z-0 w-full mb-6 group">
                            <input type="email" name="floating_email" id="floating_email"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required />
                            <label for="floating_email"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email</label>
                        </div>

                        <div id="" class="relative z-0 w-full mb-6 group">
                            <input type="email" name="floating_email" id="floating_email"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required />
                            <label for="floating_email"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Whatsapp</label>
                        </div>

                    </div>
                    <!-- Modal footer -->
                    <div
                        class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button @click="agregarDatos({ nombre, apellido, email, whatsapp })"
                            data-modal-hide="defaultModal"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
                            accept
                        </button>
                        <button @click="agregarEmpleadoModal = !agregarEmpleadoModal" data-modal-hide="defaultModal"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            Decline</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="container mx-auto pl-64 pt-10">

            <div class="mx-3">
                <div class="flex justify-end ">
                    <button @click="agregarEmpleadoModal = !agregarEmpleadoModal"
                        class="bg-teal-900 text-white px-2 py-1 rounded">
                        Agregar
                    </button>
                </div>

                <div class=" border p-4 rounded mt-4 ">
                    <ul>
                        <li v-for="todo in todos" :key="todo.id">
                            <span>{{ todo.nombre }}</span>
                        </li>
                    </ul>
                </div>

            </div>

        </div>

    </div>
</template>
