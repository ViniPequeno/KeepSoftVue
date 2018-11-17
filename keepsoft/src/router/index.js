import Vue from "vue";
import Router from "vue-router";
import RecuperarSenha from "@/components/RecuperarSenha";
import ConfirmEmail from "@/components/ConfirmEmail";
import TelaInicial from "@/components/TelaInicial";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "TelaInicial",
      component: TelaInicial
    },
    {
      path: "/senha/:id",
      props: true,
      name: "RecuperarSenha",
      component: RecuperarSenha
    },
    {
      path: "/confirmEmail/:id",
      props: true,
      name: "Confirmar Email",
      component: ConfirmEmail
    }
  ]
});
