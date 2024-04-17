<template>
    <div class="form-block flex flex-col items-center gap-10">
        <h2 class="title mt-36">Working with POST request</h2>
        <form class="flex flex-col gap-10" @submit.prevent="onSubmit">
            <FloatLabel class="flex flex-col">
                <InputText id="name" v-model="name" :invalid="!!errors['name']" class="form-block__input" />
                <label for="name">Your name</label>
                <span v-if="errors['name']" class="absolute top-full form-block__error">{{ errors['name'] }}</span>
            </FloatLabel>
            <FloatLabel class="flex flex-col">
                <InputText id="email" v-model="email" class="form-block__input" :invalid="!!errors['email']" />
                <label for="email">Email</label>
                <span v-if="errors['email']" class="absolute top-full form-block__error">{{ errors['email'] }}</span>
            </FloatLabel>
            <FloatLabel class="flex flex-col">
                <InputMask id="phone" v-model="phone" mask="+380999999999" placeholder="Phone" class="form-block__input"
                    :invalid="!!errors['phone']" />
                <label for="phone">Phone</label>
                <span v-if="errors['phone']" class="absolute top-full form-block__error">{{ errors['phone'] }}</span>
            </FloatLabel>
            <div class="form-block__text">Select your position</div>
            <div class="card flex justify-content-center">
                <div class="flex flex-col gap-3">
                    <div v-for="category in categories" :key="category.id" class="flex align-items-center">
                        <RadioButton v-model="selectedCategory" :inputId="category.id.toString()" name="dynamic"
                            :value="category.id" :invalid="!!errors['selectedCategory']" />
                        <label :for="category.id" class="ml-2">{{ category.name }}</label>
                    </div>
                    <span v-if="errors['selectedCategory']" class="absolute top-full form-block__error">{{
            errors['selectedCategory'] }}</span>
                </div>
            </div>
            <div class="">
                <div class="flex relative form-block__upload">
                    <input type="file" hidden @change="handleFileChange" ref="fileInput" />
                    <button @click="triggerFileInput" class="form-block__upload-btn" type="button">Upload</button>
                    <span class="form-block__upload-text truncate"
                        :class="{ 'form-block__upload-text--dark': isFileUpload }">{{ message }}</span>
                    <span v-if="errors['photo']" class="absolute top-full form-block__error">{{
            errors['photo'] }}</span>
                </div>
            </div>

            <Button @click="onSubmit" class="self-center flex mb-24 form-block__btn" label="Sing up" rounded />
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import UsersService from '@/services/UsersService'
import InputMask from 'primevue/inputmask'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits('updateUserList')

const fileInput = ref(null);
const message = ref('Upload your photo')
const isFileUpload = ref(false)
const categories = ref([])


function triggerFileInput() {
    fileInput.value.click()
}

function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
        message.value = file.name
        isFileUpload.value = true
        photo.value = file
    } else {
        message.value = 'Upload your photo'
        isFileUpload.value = false
    }
}

onMounted(() => {
    UsersService.getPositions().then((response) => {
        if (response.success) {
            categories.value = response.positions
        }
    })
})


// validation

const schema = yup.object({
    name: yup.string().required().min(2).max(60),
    email: yup.string().required().email(),
    phone: yup.string().required().matches(/^\+380([0-9]{9})$/, 'invalid phone number'),
    selectedCategory: yup.number().required(),
    photo: yup.mixed().required()
        .test('fileSize', 'The file must not be greater than 5 MB', value => !value || (value.size <= 5242880))
        .test('fileType', 'The file must be a JPEG or JPG', value => !value || ['image/jpeg', 'image/jpg'].includes(value.type))
        .test('fileDimensions', 'The image must be at least 70x70px', async value => {
            return new Promise(resolve => {
                const img = new Image();
                img.onload = () => {
                    resolve(img.width >= 70 && img.height >= 70);
                };
                img.onerror = () => {
                    resolve(false);
                };
                img.src = URL.createObjectURL(value);
            });
        })
});

const { handleSubmit, errors } = useForm({
    validationSchema: schema
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: phone } = useField('phone');
const { value: selectedCategory } = useField('selectedCategory')
const { value: photo } = useField('photo');

const onSubmit = handleSubmit(values => {
    console.log('values', values)
    const formData = new FormData()
    formData.append('position_id', values.selectedCategory)
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    formData.append('photo', values.photo)


    UsersService.createUser(formData).then((response) => {
        console.log(response);
        if (response.success) {
            emit('updateUserList')
        }
    })
}, (errors) => {
    console.log('errors', errors);
});

const addNewUser = () => {

}


</script>

<style scoped lang="scss">
.form-block {
    &__text {
        margin-bottom: -38px;
    }

    &__input {
        min-width: 380px;
    }

    &__upload {
        max-width: 380px;
    }

    &__upload-btn {
        padding: 10px;
        border: 1px solid rgba(0, 0, 0, 0.8);
        cursor: pointer;
        border-radius: 4px 0 0 4px;
    }

    &__upload-text {
        color: #aaa;
        border-top: 1px solid #D0CFCF;
        border-right: 1px solid #D0CFCF;
        border-bottom: 1px solid #D0CFCF;
        padding: 13px 14px 14px 14px;
        border-radius: 0 4px 4px 0;
        width: 100%;

        &--dark {
            color: rgba(0, 0, 0, 0.8);
        }
    }

    &__error {
        color: #B00020;
    }
}
</style>