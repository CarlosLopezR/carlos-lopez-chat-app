<template>
  <nav class="fixed w-full bg-cyan-800 shadow-xl top-0 z-50">
    <div
      class="container flex content-center items-center justify-between h-16 px-4"
    >
      <h1 class="text-white text-xl">
        <strong>Carlos Lopez</strong> Global Channel
        <sup class="text-xs">Chat App</sup>
      </h1>
      <div v-if="isLogin">
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>
      <button v-else class="bg-green-500 hover:bg-green-600" @click="signIn">
        Sign In
      </button>
    </div>
  </nav>
</template>

<script>
import { useAuth } from "./firebase";

export default {
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth();
    return { user, isLogin, signIn, signOut };
  },
};
</script>
