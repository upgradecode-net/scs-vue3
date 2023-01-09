<script setup>
import { ref } from "vue"

// FIREBASE 9
import { db, storage } from "../firebase"
import { doc, getDoc, deleteDoc, collection, addDoc, setDoc } from "firebase/firestore"
import { getStorage, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as storageRef } from "@firebase/storage";


// VUEFIRE
import { useCollection } from 'vuefire'

// COMPONENTES
import Sidebar from "../components/Sidebar.vue"

const agregarPremioModal = ref(false)

const nombre = ref("")
const puntos = ref("")
const stock = ref("")
const imagen = ref("")

const premios = useCollection(collection(db, 'premios'))

const agregarPremio = async (payload) => {
    console.log("Funcionando")
    try {
        const docRef = await addDoc(collection(db, "premios"), {
            nombre: payload.nombre,
            puntos: payload.puntos,
            stock: payload.stock,
            imagen: payload.imagen

        });


        agregarPremioModal.value = !agregarPremioModal.value

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
const subirImagen = () => {

    let file = event.target.files[0];
    console.log(file.name);


    const referenciaStore = storageRef(storage, file.name);

    const uploadTask = uploadBytesResumable(referenciaStore, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                imagen.value = downloadURL
            });
        }
    );



}

const eliminarPremio = async (payload) => {

    if (confirm("Estas seguro pa?")) {
        await deleteDoc(doc(db, "premios", payload.id));
        console.log("Eliminado")
    } else {

    }

}





</script>

<template>
    <div v-if="agregarPremioModal" id="defaultModal" aria-hidden="true"
        class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-1/2">
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Agregar empleado
                    </h3>
                    <button @click="agregarPremioModal = !agregarPremioModal" type="button"
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

                    <div class="flex">
                        <div class="w-6/12 space-y-6 px-2">
                            <div>
                                <label class="block">Nombre</label>
                                <input required v-model="nombre" class="px-2 py-2 border rounded w-full " type="text">
                            </div>

                            <div>
                                <label class="block">Cantidad de puntos </label>
                                <input required v-model="puntos" class="px-2 py-2 border rounded w-full " type="text">
                            </div>

                            <div>
                                <label class="block">Stock </label>
                                <input required v-model="stock" class="px-2 py-2 border rounded  w-full" type="text">
                            </div>

                            <div class="">

                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    for="file_input">Upload file</label>
                                <input @change="subirImagen()"
                                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input" type="file">

                            </div>


                        </div>

                        <div class="w-6/12">
                            <div class="px-2">
                                <img class="rounded" :src="imagen" alt="">
                            </div>
                        </div>


                    </div>
                    <!-- Modal footer -->
                    <div
                        class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button @click="agregarPremio({ nombre, puntos, stock, imagen })" data-modal-hide="defaultModal"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
                        <button @click="agregarPremioModal = !agregarPremioModal" data-modal-hide="defaultModal"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <div class="flex">
        <Sidebar></Sidebar>
        <main class="w-full  pt-10">

            <div class="mx-3">
                <div class="flex justify-end ">
                    <button @click="agregarPremioModal = !agregarPremioModal"
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
                            <tr v-for="premio in premios" :key="premio.id"
                                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ premio.nombre }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ premio.puntos }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ premio.stock }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ premio.stock }}
                                </td>
                                <td class="px-6 py-4">
                                    <button @click="editarEmpleado(premio)"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                                    <button @click="eliminarPremio(premio)"
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
