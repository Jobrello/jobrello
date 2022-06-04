<style>
    .umbrella {
        transition: all 1s;
        transform-origin: 20% 0;
    }

    .umbrella:hover {
        transform: scaleX(0.1) scaleY(1.5);
    }

    .umbrella-top, .umbrella-bottom {
        display: flex;
        width: 90vh;
        aspect-ratio: 6/2.6;
    }

    .left-top {
        background-color: black;
        border:2px solid black;
        flex-grow: 1;
        flex-basis: 1;
        height: 100%;
        border-top-left-radius: 100%;
    }

    .right-top {
        border-top-right-radius: 100%;
        background-color: black;
        border:2px solid black;
        flex-grow: 1;
        flex-basis: 1;
        height: 100%;
    }

    .left-bottom {
        background-color: black;
        flex-grow: 1;
        border:2px solid black;
        border-bottom-left-radius: 50%;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 50%;
        border-bottom-right-radius: 100%;
        height: 30px;
    }

    .right-bottom {
        background-color: black;
        border:2px solid black;
        flex-grow: 1;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        height: 30px;
    }

</style>

<div class="umbrella">
    <div class="umbrella-top">
        <div class="left-top">
            Hiring complexity
        </div>
        <div class="right-top">
            ynder asdasdas 
        </div>
    </div>
    <div class="umbrella-bottom">
        <div class="left-bottom"></div>
        <div class="right-bottom"></div>
        <div class="left-bottom"></div>
        <div class="right-bottom"></div>  
        <div class="left-bottom"></div>
        <div class="right-bottom"></div>
        <div class="left-bottom"></div>
        <div class="right-bottom"></div>
        <div class="left-bottom"></div>
        <div class="right-bottom"></div>
        <div class="left-bottom"></div>
        <div class="right-bottom"></div>
        <div class="left-bottom"></div>
        <div class="right-bottom"></div>
        <div class="left-bottom"></div>
        <div class="right-bottom"></div>
    </div>
</div> 