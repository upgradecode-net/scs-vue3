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
import AgregarPremio from "../components/premios/AgregarPremio.vue"

const agregarPremioModal = ref(false)

const emitPremioModal = (payload)=>{
    console.log("Emit desde Hijo")
    console.log(payload)
    agregarPremioModal.value = payload
}

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
    console.log(file.name)

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
    
    <AgregarPremio  :agregarPremioModal="agregarPremioModal" @emitPremioModal="emitPremioModal"    />

 

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
