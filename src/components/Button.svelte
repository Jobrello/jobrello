<script lang="ts">
	type State = undefined | 'static' | 'animate' | 'success'

	export let state: State = undefined

	const onClick = () => {
		if(state && state != 'static') return
		state = 'animate'
		setTimeout(() => {
			state = 'success'
		}, 1500)
		setTimeout(() => {
			state = 'static'
		}, 2500)
	}
</script>

<button class={state} on:click={onClick} on:click>
    <slot></slot>
</button>

<style>
button {
  display: inline-block;
  min-width: 200px;
  transform: rotate(-5deg);
  margin: 20px auto;
  background: var(--jobrella-accent-color);
  color: white;
  font-size: 1.2em;
  padding: 1em;
  text-align: center;
  position: relative;
  cursor: pointer;
  box-shadow: 3px 3px grey;
  appearance: none;
  border: 0;
}

button.static {
	animation: morphBack ease-out 0.40s forwards;
}

button:focus {
	outline: none;
}

button.animate {
	animation: morph ease-out 0.40s forwards;
    color: transparent;
}

button.animate::after {
	position: absolute;
  content: '';
  width: 25px;
  height: 25px;
  border: 4px solid white;
  border-radius: 50%;
  border-left-color: transparent;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: spin 1.5s;
  animation-name: spin;
	animation-iteration-count: infinite;
}

button.success:before{
  position: absolute;
  content: '';
  width: 25px;
  height: 15px;
  border: 4px solid white;
  border-right: 0;
  border-top: 0;
  left: 50%;
  top: 45%;
  transform: rotate(0deg) scale(0);
  animation: success ease-in 0.15s forwards;
}

button.success {
	width: 50px; 
	height: 50px;
	min-width: 0;
	border-radius: 50%;
	color:transparent;
}

@keyframes morph {
	to {
		width: 50px; 
		height: 50px;
		min-width: 0;
		border-radius: 50%;
	}
}

@keyframes morphBack {
	from {
		width: 50px; 
		height: 50px;
		min-width: 0;
		border-radius: 50%;
		color:transparent;
	}
	to {
		width: 200px; 
		min-width: 200;
		border-radius: 0;
		color:white;
	}
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1);}
  90% { transform: translate(-50%, -50%) rotate(1080deg) scale(1); }
  100% { transform: translate(-50%, -50%) scale(1); }
 }

 @keyframes success{
  from {
      transform: translate(-50%, -50%) rotate(0) scale(0);
      }
  to {
    transform: translate(-50%, -50%) rotate(-45deg) scale(1);
  }
}
</style>