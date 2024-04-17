<template>
    <AppHeader>

    </AppHeader>
    <AppIntro>

    </AppIntro>
    <div class="main">
        <AppUserList
            :userList="userList"
            :showLoadMore="currentPage !== totalPage"
            @loadMore="onLoadMore"
        >

        </AppUserList>
        <AppForm @updateUserList="onUpdateUserList">

        </AppForm>
    </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppIntro from '@/components/AppIntro.vue'
import AppUserList from '@/components/AppUserList.vue'
import AppForm from '@/components/AppForm.vue'
import UsersService from '@/services/UsersService'
import { onMounted, ref } from 'vue';

const userList = ref([])
const currentPage = ref(0)
const totalPage = ref('')

onMounted(() => {
    UsersService.getToken().then((response) => {
        if (response.success) {
            localStorage.setItem('token', response.token)
        }
    })

    fetchUserList()
})

const fetchUserList = () => {
    currentPage.value += 1
    UsersService.getUsers(currentPage.value).then((response) => {
        if (response.success) {
            totalPage.value = response.total_pages
            userList.value.push(...response.users)
        }
    })
}

const onUpdateUserList = () => {
    currentPage.value = 1
    UsersService.getUsers(currentPage.value).then((response) => {
        if (response.success) {
            totalPage.value = response.total_pages
            userList.value = response.users
        }
    })
}

const onLoadMore = () => {
    fetchUserList()
}


</script>

<style scoped lang="scss">
.main {
    background-color: #F8F8F8;
}
</style>