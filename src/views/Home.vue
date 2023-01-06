<script setup>
import {
    ref
} from "vue"
import {
    db
} from "../firebase"
import {
    collection,
    addDoc
} from "firebase/firestore"

import Sidebar from "../components/Sidebar.vue"

const agregarEmpleadoModal = ref(true);

const agregarDatos = async (payload) => {
    console.log("Funcionando")
    try {
        const docRef = await addDoc(collection(db, "users"), {
            nombre: payload.nombre,
            apellido: payload.apellido,
            email: payload.email,
            whatsapp: payload.whatsapp

        });

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
    <div v-if="agregarEmpleadoModal" id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 w-1/2">
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Agregar Empleado
                    </h3>
                    <button @click="agregarEmpleadoModal = !agregarEmpleadoModal"  type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
            <form class="mt-6" action="">

                <div id="">
                    <label class="block">Nombre</label>
                    <input class="px-2 py-2 border rounded w-full" type="text">
                </div>

                <div id="">
                    <label class="block">Apellido 2</label>
                    <input class="px-2 py-2 border rounded w-full" type="text">
                </div>

                <div id="">
                    <label class="block">Email</label>
                    <input class="px-2 py-2 border rounded w-full" type="text">
                </div>

                <div id="">
                    <label class="block">Whatsapp 2</label>
                    <input class="px-2 py-2 border rounded w-full" type="text">
                </div>

            </form>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="agregarEmpleadoModal = !agregarEmpleadoModal" data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                    <button @click="agregarEmpleadoModal = !agregarEmpleadoModal" data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container mx-auto pl-64 pt-10">
        <div class="mx-3 border p-4 rounded  ">

            <button @click="agregarEmpleadoModal = !agregarEmpleadoModal" data-modal-target="default" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button>
            <button @click="agregarDatos" class="mt-10 bg-teal-600 px-2 py-1 text-white">Agregar</button>
        </div>
    </div>

</div>
</template>
