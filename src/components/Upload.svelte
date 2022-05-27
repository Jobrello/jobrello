<script lang="ts">
  export let dropFileTitle = "Drop file here"

  let isOver = false

  const handleDrop = (ev: DragEvent) => {
    ev.preventDefault()
    console.log(ev)
    isOver = false
  }

  const onOver = (ev: DragEvent) => {
    ev.preventDefault()
    isOver = true
  }

</script>

<style>
  .dropzone {
    width:200px; 
    height:75px; 
    border:1px dashed black; 
    border-radius:.25rem; 
    text-align:center;
  }

  .isOver {
    background-color: burlywood;
  }
</style>

<div
  on:dragover={onOver} 
  on:dragleave={() => isOver = false}
  on:drop={handleDrop} 
  class="dropzone"
  class:isOver>
  {dropFileTitle}
  <input type="file" id="myFile" name="filename">
</div>