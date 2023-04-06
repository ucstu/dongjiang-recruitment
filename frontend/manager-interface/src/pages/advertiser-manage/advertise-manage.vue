<template>
  <div class="p-2 w-full h-full" ref="div">
    <n-space justify="space-between" align="center">
      <n-button
        v-if="hasPermission('/advertisers/:id/advertises,POST')"
        type="primary"
        size="small"
        @click="add"
        class="mb-2"
      >
        新增
      </n-button>
      <n-button
        v-if="hasPermission('/advertisers/:id/advertises,GET')"
        text
        size="small"
        @click="refresh"
        class="mb-2"
      >
        刷新
      </n-button>
    </n-space>
    <n-data-table
      remote
      ref="table"
      class="flex-1"
      :columns="columns"
      :data="authorities"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row) => row.id"
      :max-height="maxHeight"
      @update:page="changePage"
      @update:sorter="changeSorter"
      @update:filters="changeFilters"
      @update-page-size="changePageSize"
    />
    <n-modal v-model:show="showModal" :width="600" :closable="true">
      <n-card
        style="width: 600px"
        :title="modalTitle"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form
          ref="form"
          :rules="rules"
          :model="current"
          :label-width="80"
          :loading="addLoading"
        >
          <n-form-item label="广告名称" path="name">
            <n-input
              v-model:value="current.name"
              :readonly="modalType === 'view'"
              placeholder="请输入广告名称"
            />
          </n-form-item>
        </n-form>
        <n-button
          v-if="modalType !== 'view'"
          :loading="addLoading || updateLoading"
          type="primary"
          size="small"
          class="mt-2"
          @click="submit"
        >
          提交
        </n-button>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="tsx">
import { hasPermission } from "@/hooks";
import type { Advertise } from "@dongjiang-recruitment/service-common";
import dayjs from "dayjs";
import * as _ from "lodash";
import type {
DataTableColumns,
FormRules,
NDataTable,
NForm,
PaginationProps,
} from "naive-ui";
import type {
FilterState,
SortState,
TableBaseColumn,
} from "naive-ui/es/data-table/src/interface";

const div = ref<HTMLDivElement>();
const { height } = useElementSize(div);
const maxHeight = computed(() => height.value - 90);

const route = useRoute();
const advertiserId = computed(() => route.query.advertiserId);

const showModal = ref(false);
const modalType = ref<"add" | "edit" | "view">("add");
const modalTitle = computed(() => {
  return modalType.value !== "add"
    ? `${modalTypeMap[modalType.value]}：${current.value.name}`
    : modalTypeMap[modalType.value];
});
const modalTypeMap = {
  add: "新增",
  edit: "编辑",
  view: "查看",
};

const rules: FormRules = {
  name: [
    {
      required: true,
      message: "请输入广告名称",
    },
  ],
};

const form = ref<InstanceType<typeof NForm>>();
const validate = async () => {
  return await new Promise<boolean>((resolve, reject) => {
    form.value?.validate((errors) => {
      if (!errors) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};
const submit = async () => {
  if (!(await validate())) return;
  if (modalType.value === "add") {
    _add();
  } else if (modalType.value === "edit") {
    _update();
  }
};

// 增
const current = ref<Advertise>({} as Advertise);
const { refreshAsync: _add, loading: addLoading } =
  advertiserAdvertiseService.useAddAdvertise(
    () => ({
      advertiserId: current.value.advertiser.id,
      requestBody: current.value,
    }),
    {
      manual: true,
      onSuccess: () => {
        $message.success("新增成功");
        showModal.value = false;
        refresh();
      },
    }
  );
const add = () => {
  modalType.value = "add";
  current.value = {} as Advertise;
  showModal.value = true;
};

// 删
const { refreshAsync: _remove, loading: removeLoading } =
  advertiserAdvertiseService.useRemoveAdvertise(
    () => ({
      advertiserId: current.value.advertiser.id,
      id: current.value.id,
    }),
    {
      manual: true,
      onSuccess: () => {
        $message.success("删除成功");
        refresh();
      },
    }
  );
const remove = (advertise: Advertise) => {
  current.value = _.cloneDeep(advertise);
  const dialog = $dialog.confirm({
    title: "删除",
    content: "确定删除吗？",
    confirm() {
      _remove();
    },
    cancel() {
      dialog.destroy();
    },
  });
};

// 改
const { refreshAsync: _update, loading: updateLoading } =
  advertiserAdvertiseService.useUpdateAdvertise(
    () => ({
      advertiserId: current.value.advertiser.id,
      id: current.value.id,
      requestBody: current.value,
    }),
    {
      manual: true,
      onSuccess: () => {
        $message.success("修改成功");
        showModal.value = false;
        refresh();
      },
    }
  );
const update = (advertise: Advertise) => {
  modalType.value = "edit";
  current.value = _.cloneDeep(advertise);
  showModal.value = true;
};

// 查所有
const sortStates = ref<Array<SortState>>([]);
const pagination = ref<PaginationProps>({
  page: 1,
  pageSize: 10,
  pageCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  prefix({ itemCount }) {
    return `总计：${itemCount}`;
  },
});
const columns = computed<DataTableColumns<Advertise>>(() => [
  {
    title: "创建时间",
    key: "createdAt",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "createdAt")?.order ||
      false,
    render: (row) => {
      return <span>{dayjs(row.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>;
    },
  },
  {
    title: "更新时间",
    key: "updatedAt",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "updatedAt")?.order ||
      false,
    render: (row) => {
      return <span>{dayjs(row.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>;
    },
  },
  {
    title: "广告名称",
    key: "name",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "name")?.order ||
      false,
  },
  {
    title: "操作",
    key: "action",
    render: (row) => {
      return (
        <n-space>
          {hasPermission("/advertiser/:advertiserId/advertise/:id,GET") && (
            <n-button size="small" type="primary" onClick={() => get(row)}>
              查看
            </n-button>
          )}
          {hasPermission("/advertiser/:advertiserId/advertise:id,PUT") && (
            <n-button size="small" type="primary" onClick={() => update(row)}>
              编辑
            </n-button>
          )}
          {hasPermission("/advertiser/:advertiserId/advertise:id,DELETE") && (
            <n-button size="small" type="error" onClick={() => remove(row)}>
              删除
            </n-button>
          )}
        </n-space>
      );
    },
  },
]);
const {
  data: _authorities,
  loading,
  refreshAsync: refresh,
} = advertiserService.useQueryAllAdvertise(
  () => ({
    query: advertiserId.value
      ? {
          "advertiser.id": ["$eq", advertiserId.value],
        }
      : undefined,
    page: pagination.value.page,
    size: pagination.value.pageSize,
    sort: sortStates.value.map(
      (item) => `${item.columnKey},${item.order}`
    ) as any,
  }),
  {
    refreshDeps: [
      computed(() => pagination.value.page),
      computed(() => pagination.value.pageSize),
      computed(() => sortStates.value),
    ],
    onSuccess: (data) => {
      pagination.value.itemCount = data.total;
    },
  }
);
const authorities = computed(() => _authorities.value?.items ?? []);

const changeSorter = (sortState: SortState & SortState[]) => {
  const _sortStates = Array.isArray(sortState) ? sortState : [sortState];
  _sortStates.forEach((sortState) => {
    const index = sortStates.value.findIndex(
      (item) => item.columnKey === sortState.columnKey
    );
    if (index === -1) {
      sortStates.value.push(sortState);
    } else {
      sortStates.value[index] = sortState;
    }
  });
};

const changeFilters = (
  filterState: FilterState,
  sourceColumn: TableBaseColumn
) => {
  console.log(filterState, sourceColumn);
};

const changePage = (page: number) => {
  pagination.value.page = page;
};

const changePageSize = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
};

// 查单个
const { refreshAsync: _get, loading: getLoading } =
  advertiserAdvertiseService.useGetAdvertise(
    () => ({
      advertiserId: current.value.advertiser.id,
      id: current.value.id,
    }),
    {
      manual: true,
      onSuccess: (data) => {
        current.value = data;
      },
    }
  );
const get = (advertise: Advertise) => {
  modalType.value = "view";
  current.value = _.cloneDeep(advertise);
  showModal.value = true;
};
</script>
