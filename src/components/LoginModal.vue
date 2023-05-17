<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">


                    <div class="modal-header">
                        <h3 slot="header">로그인</h3>
                        <button class="modal-default-button" @click="$emit('close')">
                            닫기
                        </button>
                    </div>


                    <div class="modal-body">
                        <slot name="body">
                            <form action="">
                                <div>
                                    <input type="email" class="form-control" id="email1"
                                        placeholder="Your email address...">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" id="password1"
                                        placeholder="Your password...">
                                </div>
                                <div>
                                    <button type="button" class="btn btn-info btn-block btn-round">Login</button>
                                </div>
                            </form>
                        </slot>
                    </div>


                    <div class="signup-section model-footer" style="text-align: center;">Not a member yet? <a href="#a"
                            class="text-info"> Sign Up</a>.
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>
  
<script>
export default {}
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}


.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    color: #555555;
}


.modal-container {
    width: 450px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}


.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}


.modal-body {
    margin: 20px 0;
}


.modal-default-button {
    float: right;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */


.modal-enter {
    opacity: 0;
}


.modal-leave-active {
    opacity: 0;
}


.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>