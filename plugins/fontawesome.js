// For Nuxt 3
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faAmbulance,
  faBookmark,
  faCalendar,
  faCertificate,
  faCoffee,
  faEdit,
  faEnvelope,
  faHeart,
  faMoon,
  faPlay,
  faSpinner,
  faSquare,
  faStar,
  faSun,
  faTimes,
  faWrench,
  fas,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
  faCoffee,
  faSpinner,
  faWrench,
  faAmbulance,
  faEdit,
  faSquare,
  faCalendar,
  faCertificate,
  faEnvelope,
  faTimes,
  faBookmark,
  faHeart,
  faPlay,
  faSun,
  faMoon,
  faStar,
  fas,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {});
});
