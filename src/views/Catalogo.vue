<script setup>
import { ref } from "vue"
import { db } from "../firebase"
import { doc, getDoc, deleteDoc, collection, addDoc, setDoc, query, where } from "firebase/firestore"

import { useCollection } from 'vuefire'



import Sidebar from "../components/Sidebar.vue"

const agregarEmpleadoModal = ref(false);
const editarEmpleadoModal = ref(false);
const editarVentasEmpleadoModal = ref(false);

const nombre = ref("")
const apellido = ref("")
const email = ref("")
const whatsapp = ref("")
const empleado = ref({})
const oldId = ref("")

const empleados = useCollection(collection(db, 'empleados'))
/* const empleadosFilter = useCollection(collection(db, 'empleados').where("nombre", "==", "Claudio") ) */



const agregarDatos = async (payload) => {
    console.log("Funcionando")
    try {
        const docRef = await addDoc(collection(db, "empleados"), {
            nombre: payload.nombre,
            apellido: payload.apellido,
            email: payload.email,
            whatsapp: payload.whatsapp,
            ventas: "0",
            puntos: "0"

        });

        nombre.value = ""
        apellido.value = ""
        email.value = ""
        whatsapp.value = ""
        agregarEmpleadoModal.value = !agregarEmpleadoModal.value

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const sumarVentasEmpleado = async () => {
    editarVentasEmpleadoModal.value = !editarVentasEmpleadoModal.value

    let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());
    console.log(mesActual)




}

const editarEmpleado = async (payload) => {

    editarEmpleadoModal.value = !editarEmpleadoModal.value

    const docRef = doc(db, "empleados", payload.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        empleado.value = docSnap.data();
        oldId.value = payload.id
        console.log(oldId.value)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

}

const actualizarEmpleado = () => {

    console.log(oldId)
    const cityRef = doc(db, 'empleados', oldId.value);
    setDoc(cityRef, {
        nombre: empleado.value.nombre,
        apellido: empleado.value.apellido,
        email: empleado.value.email,
        whatsapp: empleado.value.whatsapp
    }, { merge: true });

    editarEmpleadoModal.value = !editarEmpleadoModal.value

}

const eliminarEmpleado = async (payload) => {

    if (confirm("Estas seguro pa?")) {
        await deleteDoc(doc(db, "empleados", payload.id));
        console.log("Eliminado")
    } else {

    }

}
</script>

<template>


    <div v-if="agregarEmpleadoModal" id="defaultModal" aria-hidden="true"
        class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-1/2">
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

                    <div id="">
                        <label class="block">Nombre</label>
                        <input required v-model="nombre" class="px-2 py-2 border rounded w-full " type="text">
                    </div>

                    <div id="">
                        <label class="block">Apellido </label>
                        <input required v-model="apellido" class="px-2 py-2 border rounded w-full " type="text">
                    </div>

                    <div id="">
                        <label class="block">Email</label>
                        <input v-model="email" class="px-2 py-2 border rounded w-full " type="text">
                    </div>

                    <div id="">
                        <label class="block">Whatsapp </label>
                        <input v-model="whatsapp" class="px-2 py-2 border rounded w-full" type="text">
                    </div>

                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="agregarDatos({ nombre, apellido, email, whatsapp })" data-modal-hide="defaultModal"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
                    <button @click="agregarEmpleadoModal = !agregarEmpleadoModal" data-modal-hide="defaultModal"
                        type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                </div>

            </div>
        </div>
    </div>

    <div v-if="editarEmpleadoModal" id="defaultModal" aria-hidden="true"
        class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Editar empleado
                    </h3>
                    <button @click="editarEmpleadoModal = !editarEmpleadoModal" type="button"
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

                    <div id="">
                        <label class="block">Nombre</label>
                        <input required v-model="empleado.nombre" class="px-2 py-2 border rounded w-full " type="text">
                    </div>

                    <div id="">
                        <label class="block">Apellido </label>
                        <input required v-model="empleado.apellido" class="px-2 py-2 border rounded " type="text">
                    </div>

                    <div id="">
                        <label class="block">Email</label>
                        <input v-model="empleado.email" class="px-2 py-2 border rounded " type="text">
                    </div>

                    <div id="">
                        <label class="block">Whatsapp </label>
                        <input v-model="empleado.whatsapp" class="px-2 py-2 border rounded " type="text">
                    </div>

                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="actualizarEmpleado()" data-modal-hide="defaultModal"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Editar</button>
                    <button @click="editarEmpleadoModal = !editarEmpleadoModal" data-modal-hide="defaultModal"
                        type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                </div>

            </div>
        </div>
    </div>

    <div v-if="editarVentasEmpleadoModal" id="defaultModal" aria-hidden="true"
        class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Editar empleado
                    </h3>
                    <button @click="editarVentasEmpleadoModal = !editarVentasEmpleadoModal" type="button"
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

                    <div id="">
                        <label class="block">Ventas</label>
                        <input required v-model="empleado.nombre" class="px-2 py-2 border rounded w-full " type="text">
                    </div>


                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="actualizarEmpleado()" data-modal-hide="defaultModal"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Editar</button>
                    <button @click="editarVentasEmpleadoModal = !editarVentasEmpleadoModal"
                        data-modal-hide="defaultModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                </div>

            </div>
        </div>
    </div>
    <div class=" flex">
        <Sidebar></Sidebar>


        <main class="w-full p-3">

            <div class="mx-3">
                <div class="flex justify-end ">
                    <button @click="agregarEmpleadoModal = !agregarEmpleadoModal"
                        class="bg-teal-900 text-white px-2 py-1 rounded">
                        Agregar
                    </button>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="empleado in empleados" :key="empleado.id"
                                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ empleado.nombre }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ empleado.apellido }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ empleado.email }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ empleado.whatsapp }}
                                </td>
                                <td class="px-6 py-4 space-x-2">
                                    <button @click="sumarVentasEmpleado(empleado)"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline ">Sumar</button>
                                    <button @click="editarEmpleado(empleado)"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                                    <button @click="eliminarEmpleado(empleado)"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Eliminar</button>
                                </td>
                            </tr>




                        </tbody>
                    </table>
                </div>

            </div>

        </main>

    </div>

</template>
