<button on:click>
    <slot></slot>
</button>

<style>
	button {
		background: var(--jobrella-accent-color);
		color: white;
		border: unset;
		cursor: pointer;
		padding: 1rem 3rem;
        font-size: 1.25rem;
        box-shadow: 3px 3px grey;
	}
</style>