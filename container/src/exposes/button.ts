import Button from './components/PublicButton.vue'

import { createBridgeComponent } from '@module-federation/bridge-vue3';

export default createBridgeComponent({
  rootComponent: Button,
});