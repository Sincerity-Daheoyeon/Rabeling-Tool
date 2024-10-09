<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ThumbnailItem",
  props: {
    // thumbnail은 환자의 이름과 이미지 데이터를 포함하는 객체
    thumbnail: {
      type: Object as () => {
        patient_name: string;
        thumbnail_image: string;
        label: string;
      },
      required: true,
    },
  },
  methods: {
    convertLabel(label: string): string {
      return parseInt(label) < 0 ? "?" : label.toString();
    },
  },
  computed: {
    badgeColor(): string {
      if (this.convertLabel(this.thumbnail.label) === "0") {
        return "badge-class-00";
      } else if (this.convertLabel(this.thumbnail.label) === "1") {
        return "badge-class-01";
      } else {
        return "badge-none";
      }
    },
  },
});
</script>

<template>
  <div class="thumbnail-item">
    <img
      :src="'data:image/png;base64,' + thumbnail.thumbnail_image"
      class="img"
      alt="Thumbnail"
    />
    <div :class="['badge', badgeColor]">
      {{ convertLabel(thumbnail.label) }}
    </div>
    <div class="patient-name">{{ thumbnail.patient_name }}</div>
  </div>
</template>

<style scoped>
.thumbnail-item {
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center; /* 텍스트 중앙 정렬 */
  height: 150px;
}

.thumbnail-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin: 30px 10px 5px;
  box-shadow: 0 0 0 0.25px #ececec;
}

.badge {
  color: white;
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  text-align: center;
  right: 25px;
  top: 20px;
  transform: translate(50%, -50%);
  z-index: 10;
  border: white 1px solid;
  border-radius: 5px;
}

.badge-none {
  background-color: #2b2b2b;
}

.badge-class-00 {
  background-color: #007bff;
}

.badge-class-01 {
  background-color: #728c46;
}

.patient-name {
  margin-bottom: 10px;
  font-size: 0.85rem;
  font-weight: bold;
  color: #ffffff;
}
</style>
