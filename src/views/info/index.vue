<template>
    <div :class="['menu-item-container', 'info-container', store.theme]">
        <div class="info-container-header">
            <div class="summarize">这里是你的个人信息～</div>
        </div>
        <div class="info-container-body"></div>
        <div class="info-container-footer"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme.js'
const store = useThemeStore()
const state = ref('')
</script>
<style lang="less" scoped>
.info-container {
    padding: 50px 0 0 190px;

    &-header {
        .summarize {
            color: #fcac2b;
            font-weight: 600
        }
    }

    &-body {}

    &-footer {}
}
</style>
