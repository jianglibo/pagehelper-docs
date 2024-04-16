---
title: Alpine row selector
layout: default
nav_order: 5
has_children: false
parent: Helpers List
---

# alpine row selector solution


<button
  type="button"
  ph-params="id::6"
  ph-pjax-link="../../playground/"
  class="btn btn-sm">
<span x-text="btnLabel">Live DEMO</span>
</button>

## demo code.

```html
    <div x-data="selector('dataname', {debug: true})">
      <div
        class="row"
        ph-config="display"
        x-init="setAllRows([{id: 1, name: 'one'}, {id:2, name: 'two'}, {id: 3, name: 'three'}])"
      >
        <div class="col-auto">
          <div>
            <div class="btn-group" role="group" style="white-space: nowrap">
              <style></style>
              <button
                class="btn btn-sm"
                type="button"
                ph-mask="7"
                :disabled="isDisabled(7)"
                ph-pjax-link=".../create"
              >
                新建
              </button>
              <button
                type="button"
                class="btn btn-sm"
                ph-mask="2"
                ph-params="selectedIds:::__selected_ids__/default"
                :disabled="isDisabled(2)"
                ph-pjax-link=".../edit"
              >
                <span>编辑</span>
              </button>

              <button
                type="button"
                class="btn btn-sm"
                ph-mask="6"
                ph-params="ids:::__selected_ids__/default"
                ph-confirm=""
                ph-method="delete"
                :disabled="isDisabled(6)"
                ph-ajax="."
              >
                <span>删除</span>
              </button>

              <button
                type="button"
                class="btn btn-sm"
                ph-mask="4"
                ph-params="runnerid:::__selected_ids__/default"
                ph-pjax-link="/user/30/lxdimgs"
                :disabled="isDisabled(4)"
              >
                compare
              </button>

              <button
                type="button"
                class="btn btn-sm"
                ph-mask="2"
                ph-params="selectedIds:::__selected_ids__/default"
                ph-link=".../deployBundle"
              >
                <span>DownlodDeployBundle</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <table
        class="table"
      >
        <thead>
          <tr>
            <th>
              <div>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  x-effect="$el.indeterminate = isIndeterminate()"
                  x-bind:checked="isAllSelected()"
                  @change="toggleSelectAll()"
                />
              </div>
            </th>
            <th scope="col">ID</th>
            <th scope="col">
              <span>Status</span>
            </th>
            <th scope="col">
              <span>Hostname</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template x-for="row in allRows">
            <tr>
              <th>
                <div>
                  <input
                    tabindex="1"
                    class="form-check-input"
                    :id="`_row_${row.id}`"
                    type="checkbox"
                    x-bind:checked="isSelected($el)"
                    @click="toggleSelect($el)"
                    aria-label="..."
                  />
                </div>
              </th>
              <td>
                <a x-bind:href="`/user/30/runners/edit?selectedIds=${row.id}`" x-text="row.id"
                  >23</a
                >
              </td>
              <td>running</td>
              <td>
                <span x-text="row.name">hello</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
```