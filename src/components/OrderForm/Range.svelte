<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    export let value: number = 1
    export let min: number = 0
    export let max: number = 5

</script>

<style>
.slider {
  -webkit-appearance: none;
  width: 100%;
  border-radius: 5px;  
  background: rgb(205, 205, 205);
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: white;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  appearance: none;
  outline: none;
  border: 8px solid rgb(135, 133, 133);
  background: white;
  cursor: pointer;
}
</style>

<div class="slidecontainer">
    <input 
      bind:value={value}
      on:input={() => dispatch('change', value)}
      type="range" 
      min={min} 
      max={max} 
      class="slider">
</div>