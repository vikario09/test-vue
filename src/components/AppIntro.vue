<template>
    <div class="first-screen flex flex-col">
        <div class="container flex flex-1 items-center justify-center">
            <div class="max-w-96 text-center">
                <h2 class="title title--light ">Test assignment for front-end developer</h2>
                <p class="text-white mt-5">What defines a good front-end developer is one that
                    has
                    skilled knowledge of HTML, CSS, JS with
                    a vast understanding of User design thinking as they'll be building web interfaces with
                    accessibility in
                    mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
                <Button class="mt-8" label="Sing Up"  rounded />
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button'

</script>

<style scoped lang="scss">
.first-screen {
    min-height: 650px;

    background-image: url('@/assets/images/first-screen-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
}
</style>