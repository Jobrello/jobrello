<script lang="ts">
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  export let checked = false
</script>

<style>
    .container {
      cursor: pointer;
      user-select: none;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
    
    .container input {
      opacity: 0;
    }
    
    .checkmark {
      position: relative;
      height: 25px;
      width: 25px;
      min-width: 25px;
      border-radius: 5px;
      background-color: #eee;
    }
    
    .container input ~ .checkmark {
      background-color: #ccc;
    }
    
    .container input:checked ~ .checkmark {
      background-color: var(--jobrella-accent-color);
    }
    
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    
    .container input:checked ~ .checkmark:after {
      display: block;
    }
    
    .container .checkmark:after {
      left: 9px;
      top: 2px;
      width: 5px;
      height: 15px;
      border: solid white;
      border-width: 0 4px 4px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
</style>

<label class="container">
    <div><slot></slot></div>
    <input type="checkbox" bind:checked={checked} on:change={() => dispatch('change', checked)}>
    <div class="checkmark"></div>
</label>