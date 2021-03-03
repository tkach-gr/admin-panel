<template>
  <div class="mail-sending">
    <div class="mail-sending__item">
      <div class="info-row">
        <div class="mail-sending__text">Загрузить HTML-письмо</div>
        <input
            @change="loadFile"
            id="mailSendingFileInput"
            ref="fileInput"
            type="file"
            class="mail-sending__file"
        >
        <label
            for="mailSendingFileInput"
            class="btn btn-default btn-load"
        >
          Загрузить HTML-письмо
        </label>
      </div>
      <div class="info-row">
        <div class="mail-sending__text">
          Загружен файл: <span class="blue-text margin-text">{{ fileName }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="mail-sending__text">
          Шаблон используемый в текущей рассылке:
          <span class="blue-text margin-text">
            {{ selectedTemplate !== null ? selectedTemplate[1].message : "..."  }}
          </span>
        </div>
      </div>
      <div class="info-row sending-progress">
        <div class="sending-progress__row">
          <div class="sending-progress__row-title">Кол-во SMS:</div>
          <div class="sending-progress__row-value">
            <span class="blue-text">{{ sentMessagesAmount }}</span>
             из
            <span class="blue-text">{{ totalMessagesAmount }}</span>
          </div>
        </div>
        <div class="sending-progress__row">
          <div class="sending-progress__row-title">Рассылка выполнена на:</div>
          <div class="sending-progress__row-value blue-text">{{ progress }}%</div>
        </div>
      </div>
    </div>
    <div class="mail-sending__item">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Список последних шаблонов</h3>
        </div>
        <div class="card-body">
          <div :key="item[0]" v-for="item in lastItems" class="last-item">
            <div @click="selectTemplate(item)" class="last-item__checkbox">
              <input
                  v-model="selectedTemplate"
                  :value="item"
                  type="radio"
                  class="last-item__checkbox-input"
              >
              <div class="last-item__checkbox-text">{{ item[1].message }}</div>
            </div>
            <div class="last-item__delete">
              <div @click="lastItems.delete(item[0])" class="last-item__delete-text">
                Удалить
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "@/scripts/database";

export default {
  name: "MailSendingContent",
  props: ["selectedUsers", "sendingEvent"],
  data() {
    return {
      sourceRef: "sending/mail",
      input: this.$refs.fileInput,
      message: null,
      fileName: "...",
      lastItems: [],
      progress: 0,
      selectedTemplate: null,
      sentMessagesAmount: 0,
      totalMessagesAmount: 0,
      isSentEmptyMessage: false,
    };
  },
  methods: {
    calculateProgress() {
      if(this.sentMessagesAmount !== 0) {
        this.progress = Math.floor(this.sentMessagesAmount / this.totalMessagesAmount * 100);
      } else {
        this.progress = 0;
      }
    },
    notify() {
      if(this.fileName !== "...") {
        return { ref: this.sourceRef, message: this.fileName };
      } else {
        this.isSentEmptyMessage = true;
        return { ref: this.sourceRef, message: null};
      }
    },
    loadFile() {
      this.selectedTemplate = null;
      this.message = this.$refs.fileInput.files[0];
    },
    updateLastItems(list) {
      this.lastItems = new Map();
      Object.entries(list).map(item => {
        this.lastItems.set(item[0], item[1]);
      });
    },
    selectTemplate(template) {
      if(this.selectedTemplate !== null && this.selectedTemplate[0] !== template[0]) {
        this.selectedTemplate = template;
      } else {
        this.selectedTemplate = null;
      }
    }
  },
  watch: {
    message(newValue) {
      if(this.message !== null && this.message !== undefined) {
        this.fileName = this.message.name;
      } else {
        this.fileName = "...";
      }
    },
    sentMessagesAmount(newValue) {
      this.calculateProgress();
    },
    totalMessagesAmount(newValue) {
      this.calculateProgress();
    },
    selectedTemplate(newValue) {
      if(this.selectedTemplate !== null) {
        this.fileName = newValue[1].message;
      } else {
        this.fileName = "...";
      }
    }
  },
  mounted() {
    if(this.selectedUsers !== undefined) {
      this.totalMessagesAmount = this.selectedUsers.length;
    }

    this.sendingEvent.subscribe(num => this.sentMessagesAmount = num);
    this.sendingEvent.setInformant(() => this.notify());

    database.listenLastItems(this.sourceRef, 5, this.updateLastItems.bind(this));
  }
};
</script>

<style lang="scss" scoped>
.emptymessage {
  border-color: rgb(255, 0, 0) !important;
}

.blue-text {
  color: #007bff;
}

.margin-text {
  margin-left: 15px
}

.info-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 13px;
}

.mail-sending {
  display: flex;
  justify-content: space-between;
}

.mail-sending__item {
  flex: 48% 0 0;
}

.mail-sending__text {
  display: flex;
  justify-content: flex-start;
  text-align: left;
}

.mail-sending__file {
  display: none;
}

.btn-load {
  margin-left: 40px;
  font-weight: 400 !important;
}

.sending-progress {
  margin-top: 25px;
  display: flex;
  align-items: flex-start;
}

.sending-progress__row {
  display: flex;
  margin-left: 30px;
}

.sending-progress__row:first-child {
  margin-left: 0;
}

.sending-progress__row-value {
  margin-left: 10px;
}

.sending-progress__row-title,
.sending-progress__row-value {
  text-align: left;
}

.last-item {
  display: flex;
  align-items: center;
  line-height: 11px;
  margin-top: 18px;
}

.last-item:first-child {
  margin-top: 0px;
}

.last-item__checkbox {
  display: flex;
  align-items: center;
}

.last-item__checkbox-text {
  margin-left: 10px;
}

.last-item__delete {
  width: 100%;
  //flex: 100% 0 0;
  display: flex;
  justify-content: flex-end;
  position: relative;
  color: #ff1515;
}

.last-item__delete-text {
  position: relative;
  cursor: pointer;
}

.last-item__delete-text::before {
  content: "";
  position: absolute;
  left: 0;
  top: calc(100% + 6px);
  width: 100%;
  height: 0;
  border-bottom: #ff1515 1px solid;

}
</style>