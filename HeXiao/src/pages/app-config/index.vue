<template>
  <page-model :config="config" />
</template>

<script lang="tsx">
import { convertEnumToList } from "@/frame/utils/enum-helper";
import { AppVersionTypeEnum } from "@/models/business/common/enum";
import { defineConfig } from "@juzhenfe/page-model";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AppConfigure",
  setup() {
    let config = defineConfig<AppConfigResultModel, { extend: " " }>({
      url: "/api/AppConfigures",
      addButton: {
        text: "新增版本",
      },
      delKey: "id",
      urlMode: "params",
      table: {
        props: {
          border: true,
          stripe: true,
        },
        operate: {
          els: [
            {
              text: "编辑",
              isEdit: true,
              props: {
                link: true,
                type: "primary",
              },
            },
            {
              text: "删除",
              isDel: true,
              props: {
                link: true,
                type: "primary",
              },
            },
          ],
        },
        els: [
          {
            label: "版本号",
            prop: "versionNumber",
          },
          {
            label: "类型",
            prop: "showType",
          },
          {
            label: "版本描述",
            prop: "appDesc",
          },
          {
            label: "客户端地址",
            prop: "linkUrl",
          },
          {
            label: "创建时间",
            prop: "creationTime",
          },
        ],
      },
      form: {
        props: {
          labelWidth: "120px",
        },
        required: ["linkUrl", "versionNumber", "type"],
        initialData: {
          type: AppVersionTypeEnum.公司端,
        },
        els: [
          {
            eType: "img-upload",
            label: "客户端地址",
            prop: "linkUrl",
            props: {
              mode: "file",
            },
          },
          {
            eType: "el-radio-group",
            label: "版本类型",
            prop: "type",
            optionsData: {
              list: convertEnumToList(AppVersionTypeEnum),
            },
          },
          {
            eType: "el-input",
            label: "版本号",
            prop: "versionNumber",
          },
          {
            eType: "el-input",
            label: "版本描述",
            prop: "appDesc",
            props: {
              type: "textarea",
              rows: 4,
            },
            col: {
              span: 12,
            },
          },
        ],
      },
    });

    return {
      config,
    };
  },
});
</script>
