<template>
  <div>
    <nav
      class="
        navbar navbar-expand-lg navbar-light
        bg-light bg-transparent
        mt-0
        p-lg-2 p-sm-1 menu
      "
    >
      <div class="nav">
        <div class="header-left">
          <router-link class="navbar-brand" to="/">Pet</router-link>
        </div>

        <div
          class="collapse navbar-collapse header-center justify-content-center"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav text-center">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">HOME</router-link>
            </li>
            <li class="nav-item dropdown">
              <!-- <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        SHOP
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Pets</a>
                            <a class="dropdown-item" href="#">Food</a>
                        </div> -->
              <div class="dropdown">
                <a
                  class="dropdown-toggle nav-link"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  SHOP
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <router-link class="dropdown-item" to="/pets/"
                      >Pets</router-link
                    >
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/food/"
                      >Food</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about"
                >ABOUT</router-link>
            </li>
          </ul>
        </div>

        <div class="header-right d-flex align-items-center text-center">
          <a class="search-icon" type="button" @click="search = 1">
            <svg
              style="color: black"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </a>
          <router-link to="/login" class="mx-0" v-if="!auth" style="text-decoration: none"
            ><a class="login-button" href="" title="login"
              >Login</a
          ></router-link>
          <div v-if="auth">
            <router-link :to="'/my-account/' + userId" class="mx-0" v-if="!isAdmin"
              ><a href="" title="Account Settings"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                  /></svg></a
            ></router-link>
            <router-link to="/admin" class="mx-0" v-if="isAdmin"
              ><a title="Admin Options">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="30" 
                viewBox="0 0 24 24" 
                width="30" 
                fill="#000000">
                  <path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg></a>
            </router-link>
          </div>
          <div class="cart">
            <router-link to="/cart" title="Cart" class="cart-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                /></svg
            ></router-link>
            <div class="quantity">
              <small>{{ product_quantity }}</small>
            </div>
          </div>
          
          
          <button class="logout-button" @click="onLogout" v-if="auth">
            Log Out
          </button>
        </div>
      </div>
    </nav>

    <!-- SEARCH -->
    <div class="search-tool" id="menucontainer">
      <div :class="['search-area', { active: search }]">
        <div class="search-top">
          <h3 class="search-title">Start typing and hit Enter</h3>
        </div>
        <form @submit="onSearch" class="search-form">
          <input
            type="text"
            class="search-input"
            placeholder="Seach anything"
            ref="search"
            v-model="search_request" autofocus
          />
          <button type="button" class="search-button">SEARCH</button>
        </form>
        <div class="back">
          <i type="button" @click="search = 0" class="fas fa-times"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userId: this.$store.state.userId,
      search: 0,
      search_request: "",
      message: null,
      isAdmin: 0,
      product_quantity: this.$store.state.cart
    };
  },
  async mounted() {
    this.isAdmin = (this.$store.state.isAdmin == 1) ? 1 : 0
    const response = await axios.get(
      `http://localhost:8080/cart/${this.$store.state.userId}`
    );
    const products = response.data;
    this.product_quantity = products.length
    localStorage.setItem('cart', this.product_quantity)
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
    onSearch() {
      this.search = 0;
      this.$router.replace(`/search/${this.search_request}`);
      this.search_request = "";
    },
  },
};
document.addEventListener("DOMContentLoaded", function(){

	var status = 'less';
	var menucomponent = document.querySelector('.menu');

	window.addEventListener('scroll', function(){
		if (window.pageYOffset > 80) {
			if (status== 'less') {
				status = 'more';

				menucomponent.classList.add('white-menu');
			}
		}
		else if (window.pageYOffset <= 80) {
			if(status == 'more') {
				menucomponent.classList.remove('white-menu');
				status = 'less';
			}
		}
	})
}, false)
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
/* @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap'); */
.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.header-left {
  width: 20%;
}
.navbar-brand {
  font-family: "Pacifico", cursive;
  font-size: 40px;
}
.header-center {
  width: 30%;
  text-align: center;
  color: #000;
  font-size: 20px;
}
.header-center a.nav-link {
  color: #000;
  transition: 0.3s;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  margin-right: 20px;
}
.header-center a.nav-link:hover {
  color: #ff7b01;
}
.header-center a.dropdown-item {
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  transition: 0.3s;
}
.header-center a.dropdown-item:hover {
  color: #ff7b01;
}
router-link {
  text-decoration: none;
}
.header-right {
  width: 20%;
}
.header-right a {
  margin-right: 20px;
  color: #000;
}
.header-right .cart {
  width: 20%;
  height: 30px;
  position: relative;
}
.header-right .cart .cart-icon {
  position: absolute;
  left: 0;
}
.header-right .cart .quantity {
  position: absolute;
  right: 40%;
  top: 0;
  z-index: 3;
  border-radius: 40%;
  border: 1px solid #fff;
  background-color: #ff7b01;
  height: 13px;
  min-width: 15px
}
.header-right .cart .quantity small {
  font-size: 10px;
  position: relative;
  top: -80%;
  font-weight: bold;
  color: white
}
a.login-button {
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 5px;
  padding: 3px 5px;
  transition: .4s;
}
a.login-button:hover {
  background-color: antiquewhite;
}
.logout-button {
  background-color: transparent;
  color: black;
  border: 2px solid black;
  font-family: "Quicksand", sans-serif;
  border-radius: 5px;
  font-weight: bold;
}

/* search's css */
.search-tool .search-area {
  width: 100%;
  height: 0%;
  opacity: 0;
  visibility: hidden;
  transition: height 1s ease;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  transition: transform 0.35s cubic-bezier(0.46, 0.01, 0.32, 1),
    opacity 0.4s ease-out;
  z-index: 2;
  background-color: #fff;
}
.search-top {
  display: block;
  padding: 30px 15px;
  transition-delay: 0.2s;
  transition: all 0.5s ease;
  transform: translateY(-30px);
}
.search-title {
  font-size: 40px;
  text-align: center;
  color: black;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1em;
}
.search-form {
  width: 900px;
  margin: 0 auto;
  position: relative;
  transition: all 0.6 linear;
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
}
.search-input {
  height: 44px;
  background-color: #fff;
  color: #000;
  border: none;
  border-bottom: 2px solid #e8e8e8;
  width: 100%;
}
.search-area .search-form input.search-input:active,
.search-area .search-form input.search-input:focus {
  outline: none;
  border-bottom: 2px solid #bbbaba;
}
.search-area .search-form .search-button {
  text-transform: uppercase;
  position: absolute;
  top: 0;
  right: 0;
  color: #666;
  font-size: 22px;
  height: 43px;
  text-align: center;
  font-weight: 800;
  border: none;
}
.search-area .back {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2;
}
.search-area .back i {
  font-size: 20px;
}
.search-tool .search-area.active {
  height: auto;
  opacity: 1;
  visibility: visible;
  transition: all 0.5s;
  z-index: 101;
  padding-bottom: 50px;
}
.search-tool .search-area.active .search-top {
  transform: translateY(0px);
}
.search-tool .search-area.active .search-form {
  transform: translateY(0px);
  transition-delay: 0.3s;
  opacity: 1;
  visibility: visible;
}
</style>
