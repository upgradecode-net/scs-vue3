
<script setup>
import { db } from "../firebase"
import { collection, addDoc} from "firebase/firestore";

import Sidebar from "@/components/Sidebar.vue"

const agregarDatos = async () => {
    console.log("Funcionando")
    try {
        const docRef = await addDoc(collection(db, "users"), {
            nombre: "Claudio"
         
        });
         
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
</script>

<template>
    <div>
    <Sidebar></Sidebar>
        <h1>Home</h1>
        <button @click="agregarDatos" class="mt-10 bg-teal-600 px-2 py-1 text-white">Agregar</button>
    </div>
    </template>
    
