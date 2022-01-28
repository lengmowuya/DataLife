<template>
  <div
    class="EditorAffairPanel"
    v-if="Editor.onEditorAffair && Editor.editorAffair != null"
  >
    <div class="PushAlert">
      <div
        class="AffairIcon"
        @click="Editor.showIconList = !Editor.showIconList"
      >
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-' + Editor.NewAffair.icon" />
        </svg>
      </div>
      <!-- 图标列表 -->
      <div class="IconList" v-show="Editor.showIconList">
        <div
          class="IconLI"
          v-for="(icon, i) in IconList"
          :key="i"
          @click="Editor.NewAffair.icon = icon.font_class"
          :title="icon.name"
        >
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#icon-' + icon.font_class" />
          </svg>
        </div>
      </div>
      <input
        type="text"
        v-model="Editor.NewAffair.name"
        class="NewAffairName"
        placeholder="事务新名称"
        title="名称"
      />
      <input
        type="text"
        v-model="Editor.NewAffair.describe"
        class="NewAffairDescribe"
        placeholder="事务新描述"
        title="描述"
      />
      <p class="SentenceThum">{{ pushSentence }}</p>
      <div class="PushTools">
        <button class="affirm" @click="updateAffair()">修改</button>
        <button class="cancel" @click="Editor.onEditorAffair = false">
          取消
        </button>
      </div>
      <div class="deleteButton">
        <button
          title="警告,删除不可撤销!"
          @click="removeAffair(Editor.editorAffair)"
        >
          删除事务
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 编辑板块信息
      Editor: {
        NewAffair: {
          name: "",
          describe: "",
          icon: "",
        },
        showIconList: true,
        onEditorAffair: false,
        editorAffair: null,
      },
    };
  },
};
</script>

<style></style>
