<template>
  <n-data-table
    remote
    class="p-2 w-full h-full"
    ref="table"
    :columns="columns"
    :data="accounts"
    :loading="loading"
    :pagination="pagination"
    :row-key="(row) => row.id"
    @update:sorter="handleSorterChange"
    @update:filters="handleFiltersChange"
    @update:page="handlePageChange"
  />
</template>

<script setup lang="tsx">
import type { Account } from "@dongjiang-recruitment/service-common";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import type {
FilterState,
TableBaseColumn,
} from "naive-ui/es/data-table/src/interface";

const columns: DataTableColumns<Account> = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "创建时间",
    key: "createdAt",
  },
  {
    title: "更新时间",
    key: "updatedAt",
  },
  {
    title: "用户名",
    key: "userName",
  },
  {
    title: "操作",
    key: "action",
    render: () => {
      return (
        <n-space>
          <n-button size="small" type="primary" onClick={() => {}}>
            编辑
          </n-button>
          <n-button size="small" type="error" onClick={() => {}}>
            删除
          </n-button>
        </n-space>
      );
    },
  },
];

const pagination = ref<PaginationProps>({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  pageCount: 0,
});

const { data: _accounts, loading } =
  authenticationAccountService.useQueryAccounts(
    {
      page: pagination.value.page,
      size: pagination.value.pageSize,
    },
    {
      onSuccess: (data) => {
        pagination.value.pageCount = data.total / pagination.value.pageSize!;
        pagination.value.itemCount = data.total;
      },
    }
  );

const accounts = computed(() => _accounts.value?.items ?? []);

const handleSorterChange = (sorter: DataTableColumns<Account>) => {
  console.log(sorter);
};

const handleFiltersChange = (
  filterState: FilterState,
  sourceColumn: TableBaseColumn
) => {
  console.log(filterState, sourceColumn);
};

const handlePageChange = (page: number) => {
  pagination.value.page = page;
};
</script>
