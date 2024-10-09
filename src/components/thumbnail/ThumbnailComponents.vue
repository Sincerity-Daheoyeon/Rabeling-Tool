<script lang="ts">
import { defineComponent } from "vue";
import ThumbnailItem from "@/components/thumbnail/ThumbnailItem.vue";

export default defineComponent({
  name: "ThumbnailComponents",
  components: {
    ThumbnailItem,
  },
  props: {
    thumbnailList: {
      type: Array as () => Array<{
        patient_name: string;
        thumbnail_image: string;
        label: string;
      }>,
      required: true,
    },
  },
  methods: {
    // 썸네일을 클릭하면 해당 환자의 이름을 부모로 전달
    handleThumbnailClick(patient_name: string) {
      this.$emit("select-thumbnail", patient_name);
    },
  },
});
</script>

<template>
  <div class="thumbnail-container">
    <ThumbnailItem
      v-for="(thumbnail, index) in thumbnailList"
      :key="index"
      :thumbnail="thumbnail"
      @click="handleThumbnailClick(thumbnail.patient_name)"
    />
  </div>
</template>

<style scoped>
.thumbnail-container {
  position: absolute;
  top: 50px;
  width: calc(100% - 40px);
  height: calc(100% - 90px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
  column-gap: 20px;
  row-gap: 20px;
  grid-auto-rows: minmax(150px, 150px);
  grid-auto-columns: minmax(125px, 125px);
  overflow-y: auto;
  padding: 20px;
}
</style>
