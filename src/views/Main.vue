<script lang="ts">
import { defineComponent } from "vue";
import ThumbnailComponents from "../components/thumbnail/ThumbnailComponents.vue";
import axios from "axios";

export default defineComponent({
  name: "MainView",
  components: {
    ThumbnailComponents,
  },
  data() {
    return {
      currentPatientID: "", // 현재 선택된 환자의 ID
      thumbnailList: [] as { patient_name: string; thumbnail_image: string }[], // 썸네일 리스트
      patientImages: [] as string[], // 환자의 이미지 리스트
      currentImageIndex: 0, // 현재 보여줄 이미지 인덱스
    };
  },

  methods: {
    updateImageInfo() {
      const imageInfo = document.getElementById("image-info");
      if (imageInfo) {
        imageInfo.innerText = `${this.currentPatientID} - Index: ${
          this.currentImageIndex + 1
        }`;
      }
    },
    setPatientID(patient_name: string, index: number) {
      // this.currentPatientID = `${patient_name} (Index: ${index + 1})`;
      // this.currentImageIndex = index;
      // const imageTitle = document.getElementById(
      //   "image-title"
      // ) as HTMLSpanElement;
      // if (imageTitle) {
      //   imageTitle.innerText = patient_name;
      // }
      this.currentPatientID = patient_name;
      this.currentImageIndex = index;
      this.updateImageInfo();
    },

    // preview 이미지를 업데이트하는 메서드
    updatePreview() {
      if (this.patientImages.length > 0) {
        const preview = document.getElementById("preview") as HTMLImageElement;
        preview.src = `data:image/png;base64,${
          this.patientImages[this.currentImageIndex]
        }`;
      }
    },

    // 스크롤로 이미지를 변경하는 메서드
    handleScroll(event: WheelEvent) {
      const sensitivity = 10; // 민감도 값 (크면 스크롤이 느려짐)

      if (event.deltaY < -sensitivity) {
        // 스크롤 업: 이전 이미지로 넘어감
        if (this.currentImageIndex > 0) {
          this.currentImageIndex--;
        }
        this.updatePreview(); // 이미지 변경 후 업데이트
      } else if (event.deltaY > sensitivity) {
        // 스크롤 다운: 다음 이미지로 넘어감
        if (this.currentImageIndex < this.patientImages.length - 1) {
          this.currentImageIndex++;
        }
        this.updatePreview(); // 이미지 변경 후 업데이트
      }
    },

    mounted() {
      // preview 이미지에 스크롤 이벤트 리스너 등록
      const previewElement = document.getElementById("preview");
      if (previewElement) {
        previewElement.addEventListener("wheel", this.handleScroll);
      }
    },
    beforeUnmount() {
      // 컴포넌트가 파괴될 때 이벤트 리스너 해제
      const previewElement = document.getElementById("preview");
      if (previewElement) {
        previewElement.removeEventListener("wheel", this.handleScroll);
      }
    },
  },
});
</script>

<template>
  <div class="view-container">
    <div class="left-container">
      <div class="left-items"></div>
      <div class="left-items"></div>
      <div class="left-items"></div>
      <div class="left-items"></div>
      <div class="image-title-container">
        <span class="image-title" id="image-title">{{ currentPatientID }}</span>
        <div class="image-container">
          <img
            id="preview"
            src="src/assets/default_black.svg"
            alt="loading..."
          />
        </div>
      </div>
      <div class="left-items"></div>
      <div class="left-items"></div>
      <div class="reader-container">
        <div class="reader-text-container">
          <p style="color: white">
            생각하시기에, 해당 환자는 어떤 것 같습니까? ICP가 20보다 작을 경우
            (ICP &lt;= 20 mmHg) No IICP 버튼을, 20보다 크다고 생각될 경우 (ICP
            &gt; 20 mmHg) IICP 버튼을 눌러주세요.
          </p>
        </div>
        <div class="reader-button-container">
          <button class="no-iicp" @click="setLabel(0)">
            No IICP ( &lt;= 20)
          </button>
          <button
            class="iicp"
            @click="
              () => {
                setLabel(1);
              }
            "
          >
            IICP ( > 20)
          </button>
        </div>
      </div>
      <div class="left-items"></div>
      <!--      <div class="tool-bar">-->
      <!--        <div class="tool-bar-default"></div>-->
      <!--        <div class="tool-bar-contents">-->
      <!--          <div></div>-->
      <!--&lt;!&ndash;          <div class="tool-bar-item-container">&ndash;&gt;-->
      <!--&lt;!&ndash;            <div class="tool-bar-content-item-01 tool-bar-item" id="tool-bar-content-item-01"></div>&ndash;&gt;-->
      <!--&lt;!&ndash;          </div>&ndash;&gt;-->
      <!--&lt;!&ndash;          <div class="tool-bar-item-container">&ndash;&gt;-->
      <!--&lt;!&ndash;            <div class="tool-bar-content-item-02 tool-bar-item" id="tool-bar-content-item-02"></div>&ndash;&gt;-->
      <!--&lt;!&ndash;          </div>&ndash;&gt;-->
      <!--          <div class="tool-bar-item-container">-->
      <!--            <div class="tool-bar-content-item-03 tool-bar-item" id="tool-bar-content-item-03"></div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="right-container">
      <div class="rt-container">
        <span
          id="patient-meta"
          :class="[
            currentPatientID === ''
              ? 'patient-meta-text-center'
              : 'patient-meta-text',
          ]"
        >
          <div class="description">환자 정보</div>
        </span>
      </div>
      <div class="rd-container">
        <div class="grid-item-title">
          <hr />
          Thumbnails
          <hr />
        </div>

        <div class="thumbnails-container">
          <div
            class="thumbnail-item"
            v-for="(thumbnail, index) in thumbnailList"
            :key="index"
          >
            <ThumbnailComponents
              :thumbnail="thumbnail"
              @click="setPatientID(thumbnail.patient_name)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1.75fr 1fr;
}

.left-container {
  width: 100%;
  height: 100%;
  background-color: #060a09;
  display: grid;
  grid-template-rows: 0.5fr 5fr 3fr;
  grid-template-columns: 1fr 5fr 1fr;
  justify-items: center;
  align-items: center;
  overflow: auto;
}

.tool-bar {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 20px;
  margin-top: 20px;
  width: 50px;
  height: 50px;
  background-color: #141414;
  border-radius: 20px;
  border: #2c2c2c 1px solid;
  transition: width 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tool-bar-contents {
  display: grid;
  opacity: 0;
  visibility: hidden;
  width: 0;
  height: 100%;
  grid-template-columns: 0.75fr 1fr 1fr 1fr;
  transition: opacity 0.3s ease-in-out 0.3s, visibility 0.3s ease-in-out 0.3s;
  justify-items: center;
  align-items: center;
}

.tool-bar-default {
  width: 80%;
  height: 80%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  content: url("../../../../../../Downloads/snuh-anesthesiology-front-main 2/src/assets/icons/menu.svg");
}

.tool-bar-content-item-01 {
  content: url("../../../../../../Downloads/snuh-anesthesiology-front-main 2/src/assets/icons/zoom-in.svg");
}

.tool-bar-content-item-02 {
  content: url("../../../../../../Downloads/snuh-anesthesiology-front-main 2/src/assets/icons/zoom-out.svg");
}

.tool-bar-content-item-03 {
  content: url("../../../../../../Downloads/snuh-anesthesiology-front-main 2/src/assets/icons/measure.svg");
}

.tool-bar:hover {
  width: 200px;
  box-shadow: 0 -2px 5px rgba(255, 255, 255, 0.1);
}

.tool-bar:hover .tool-bar-contents {
  width: 100%;
  opacity: 1;
  visibility: visible;
}

.tool-bar:hover .tool-bar-default {
  display: none;
}

.tool-bar-item {
  width: 70%;
  height: 70%;
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
}

.tool-bar-item-container {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tool-bar-item:hover {
  width: 90%;
  height: 90%;
}

.image-title-container {
  width: calc(min(80%, 55dvh));
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-container {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  border: #ffffff 1px solid;
  border-radius: 10px;
  overflow: hidden;
  padding: 30px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image-title {
  width: 50%;
  height: 50px;
  padding: 0 30px;
  display: flex;
  margin: auto 0;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  //background-color: #2c3e50;
  font-size: 1.35rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.reader-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
}

.reader-text-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reader-text-container p {
  color: white;
  width: 100%;
  height: 100%;
  text-align: center;
  align-content: center;
  justify-content: space-evenly;
  font-size: 1.15rem;
}

.reader-button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  width: 80%;
}

.reader-button-container button {
  min-width: 120px;
  width: 80%;
  height: 80%;
  color: rgba(255, 255, 255, 0.87);
  background: rgba(113, 104, 249, 0.15);
  border: 1px solid rgba(113, 104, 249, 1);
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-family: "Nunito", sans-serif;
  overflow: hidden;
  padding: 8px;
  font-size: 1rem;
  transition: background-color 0.45s ease-in-out, box-shadow 0.45s ease-in-out,
    border 0.45s ease-in-out;
}

.reader-button-container button:hover {
  box-shadow: 0 0 4px rgba(255, 255, 255, 1);
  border: white 1px solid;
}

.reader-button-container .no-iicp:hover {
  background-color: #007bff;
}

.reader-button-container .iicp:hover {
  background-color: #728c46;
}

.right-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 40svh 5fr;
}

.rt-container {
  width: 100%;
  height: auto;
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-top: 10px;
}

.patient-meta-text {
  width: 100%;
  color: white;
  font-size: 1.05rem;
  font-weight: bold;
  padding: 10px;
  white-space: pre-wrap;
  max-height: 40svh;
}

.patient-meta-text-center {
  width: 100%;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  padding: 10px;
  white-space: pre-wrap;
  display: flex;
  justify-content: center;
  align-items: center;
}

.description {
  width: 100%;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
  text-align: left;
}

.rd-container {
  position: relative;
  width: 100%;

  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.rd-container .grid-item-title {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
}

.rd-container .grid-item-title hr {
  width: 35%;
  height: 1px;
  background-color: #ffffff;
  transform: scaleY(0.1); /* 세로 방향으로 축소 */
}

.left-container {
  overflow: auto;
}

.thumbnails-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
  align-items: center;
  margin-bottom: 20px;
}

.thumbnail-item {
  box-sizing: border-box;
  width: 80%;
  height: 80%;
  background-color: #141414;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;
  color: #000000;
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.thumbnail-item:hover {
  transform: scale(1.05);
}

/* 웹킷 기반 브라우저에서의 스크롤바 스타일 */
::-webkit-scrollbar {
  width: 12px;
  height: 12px; /* 가로 스크롤바 높이 */
}

/* 스크롤바 트랙 스타일 (배경) */
::-webkit-scrollbar-track {
  background: #2c3e50; /* 트랙 배경색 */
  border-radius: 10px;
}

/* 스크롤바 자체 스타일 */
::-webkit-scrollbar-thumb {
  background-color: #007bff; /* 스크롤바 색상 */
  border-radius: 10px; /* 둥근 모서리 */
  border: 3px solid #2c3e50; /* 스크롤바와 트랙 사이의 간격 */
}

/* 스크롤바를 잡고 클릭했을 때의 스타일 */
::-webkit-scrollbar-thumb:active {
  background-color: #0056b3; /* 활성화 시 색상 */
}

/* 스크롤바의 각도 스타일링 (세로, 가로) */
::-webkit-scrollbar-corner {
  background: #2c3e50; /* 가로 세로 스크롤바가 만나는 모서리 부분 */
}

/* 파이어폭스에서의 스크롤바 스타일 */
html {
  scrollbar-width: thin; /* 얇은 스크롤바 */
  scrollbar-color: #007bff #2c3e50; /* 스크롤바와 트랙 색상 */
}

.center-align {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>
