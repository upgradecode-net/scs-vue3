<script setup>
import {useRouter} from "vue-router";

import {
    auth
} from "../firebase"

import {
    signInWithEmailAndPassword
} from "firebase/auth";


const router=useRouter();
const email = "";
const password = "";

const ingresar = (payload) => {
    signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
            // Signed in 

            console.log("Listo");
            router.push("/")
            const user = userCredential.user;

            // ...
        })
        .catch((error) => {
            console.log(error.message);
        })
}
</script>

<template>
<div class="login-box">
    <h2>Login</h2>
    <form @submit.prevent="ingresar({email,password})">
        <div class="user-box">
            <input v-model="email" type="text" name="" required="">
            <label>Username</label>
        </div>
        <div class="user-box">
            <input v-model="password" type="password" name="" required="">
            <label>Password</label>
        </div>
        <button type="submit" class="custom-btn btn-16">Login</button>
    </form>

</div>
</template>

<style>
html {
    height: 100%;
}

body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: linear-gradient(#141e30, #243b55);
}

.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
}

.login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
}

.login-box .user-box {
    position: relative;
}

.login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

.login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

.login-box .user-box input:focus~label,
.login-box .user-box input:valid~label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
}

.login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
}

.login-box a:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
        0 0 25px #03e9f4,
        0 0 50px #03e9f4,
        0 0 100px #03e9f4;
}

.login-box a span {
    position: absolute;
    display: block;
}

.custom-btn {
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
        7px 7px 20px 0px rgba(0, 0, 0, .1),
        4px 4px 5px 0px rgba(0, 0, 0, .1);
    outline: none;
}

.btn-16 {
    background: #00c7d1;
    border: none;
    z-index: 1;
}

.btn-16:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background-color: #047c83;
    border-radius: 5px;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
        7px 7px 20px 0px rgba(0, 0, 0, .1),
        4px 4px 5px 0px rgba(0, 0, 0, .1);
    transition: all 0.3s ease;
}

.btn-16:hover {
    color: #fff;
}

.btn-16:hover:after {
    left: 0;
    width: 100%;
}

.btn-16:active {
    top: 2px;
}
</style>
