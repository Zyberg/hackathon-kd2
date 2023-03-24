<template>
    <div style="min-height: 100vh;">
        <div class="q-pa-md" style="max-width: 300px">
            <q-uploader url="http://localhost:9000/api/images/upload" dark></q-uploader>
        </div>
    </div>
</template>


<script>
export default {
    name: 'imagesUpload',

setup() {


    // const numPages = computed(() =>
    //   Math.ceil(challenges.length / pageSize)
    // )

    return {
        // numPages,
    }
},
}

</script>