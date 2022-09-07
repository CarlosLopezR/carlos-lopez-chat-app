<template>
  <div class="container-sm mx-auto mt-20">
    <div class="mx-5">
      <Msg
        v-for="{ id, text, username, userId } in msgs"
        :key="id"
        :name="username"
        :sender="userId === user?.uid"
      >
        {{ text }}
      </Msg>
    </div>
  </div>

  <div ref="bottom" class="mt-20" />

  <div class="bottom">
    <div class="container-sm mx-auto">
      <form v-if="isLogin" @submit.prevent="send" class="flex items-center">
        <input v-model="message" placeholder="Message" required />
        <button type="submit" class="bg-green-500 hover:bg-green-600 h-10">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from "vue";
import { useAuth, useChat } from "./firebase";
import Msg from "./Msg.vue";

export default {
  components: { Msg },
  setup() {
    const { user, isLogin } = useAuth();
    const { msgs, sendText } = useChat();

    console.log(msgs);

    const bottom = ref(null);
    watch(
      msgs,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: "smooth" });
        });
      },
      { deep: true }
    );

    const message = ref("");
    const send = () => {
      sendText(message.value);
      message.value = "";
    };

    return { user, isLogin, msgs, bottom, message, send };
  },
};
</script>
