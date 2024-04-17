<template>
    <div class="container">
        <h2 class="title pt-36 pb-12">Working with GET request</h2>
        <div class="grid grid-rows-2 grid-cols-3 gap-4">
            <div class="user-card text-center" v-for="user in userList" :key="user.id">
                <img :src="user.photo" alt="" class="rounded-full mb-5 mx-auto">
                <div class="mb-5 truncate">{{ user.name }}</div>
                <div class="truncate">{{ user.position }}</div>
                <div class="truncate" v-tooltip.bottom="user.email" type="text" placeholder="Bottom">{{ user.email }}</div>
                <div class="">{{ user.phone }}</div>
            </div>
        </div>
        <Button 
            v-if="showLoadMore" 
            @click="loadMore" 
            label="Show more" 
            rounded 
            class="mt-12 flex mx-auto"  
        />
    </div>
</template>

<script setup>
import UsersService from '@/services/UsersService'
import Button from 'primevue/button'

const props = defineProps({
    userList: Array,
    showLoadMore: Boolean,
})

const emit = defineEmits(['loadMore'])

const loadMore = () => {
    emit('loadMore')
}


</script>

<style scoped lang="scss">
    .user-card {
        max-width: 370px;
        background-color: #fff;
        padding: 20px;
    }
</style>