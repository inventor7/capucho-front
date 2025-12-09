import type { ColumnDef } from '@tanstack/vue-table'
import {
  Bed,
  Box,
  Briefcase,
  CheckCircle2,
  ChefHat,
  ChevronDown,
  ChevronUp,
  Copy,
  Edit,
  Eye,
  Folder,
  MinusCircle,
  MoreHorizontal,
  Pin,
  PinOff,
  Sofa,
  Star,
  StarOff,
  Trash2,
  Trees,
  Utensils,
  XCircle,
} from 'lucide-vue-next'
import type { CheckboxCheckedState } from 'reka-ui'
import DataTableColumnHeader from './DataTable/DataTableColumnHeader.vue'

export const columns: ColumnDef<Product>[] = [
  // Selection Column
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        modelValue:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:modelValue': (value: CheckboxCheckedState) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: CheckboxCheckedState) => row.toggleSelected(!!value),
        ariaLabel: `Select ${row.original.name}`,
        onClick: (e: Event) => e.stopPropagation(), // Prevent row click
      }),
    enableSorting: false,
    enableHiding: false,
    enablePinning: true,
    enableGrouping: false,
    enableResizing: false,
    size: 40,
    minSize: 40,
    maxSize: 40,
    meta: {
      disableDragging: true, // Prevent dragging of select column
    },
  },

  // ID Column (hidden by default, useful for grouping)
  {
    accessorKey: 'id',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'ID' }),
    cell: ({ row }) => h('div', { class: 'font-mono text-xs' }, row.getValue('id')),
    enableSorting: true,
    enableHiding: true,
    enableGrouping: true,
    enableColumnFilter: true,
    enableResizing: false,
    filterFn: 'includesString',
    size: 80,
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
      disableDragging: true, // Prevent dragging of ID column
    },
  },

  // Image Column
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) =>
      h('div', { class: 'relative w-12 h-12 rounded-md overflow-hidden' }, [
        h('img', {
          src: row.original.image || '/placeholder.png',
          alt: row.original.name,
          class: 'object-cover w-full h-full',
          loading: 'lazy',
        }),
      ]),
    enableSorting: false,
    enableHiding: true,
    enablePinning: true,
    enableGrouping: false,
    enableResizing: true,

    size: 80,
    minSize: 60,
    maxSize: 120,
    meta: {
      disableDragging: true,
    },
  },

  // Product Name Column (with grouping support)
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Product' }),
    footer: ({ table }) => {
      const totalRows = table.getFilteredRowModel().rows.length
      return h('div', { class: 'text-start font-semibold' }, `Total: ${totalRows} products`)
    },
    cell: ({ row }) => {
      const isGrouped = row.getIsGrouped()
      const groupedValue = row.getGroupingValue('name')

      if (isGrouped) {
        return h('div', { class: 'flex items-center font-semibold' }, [
          h(Folder, { class: 'mr-2 h-4 w-4 text-primary' }),
          h('span', String(groupedValue)),
          h('span', { class: 'ml-2 text-muted-foreground' }, `(${row.subRows.length})`),
        ])
      }

      return h('div', { class: 'max-w-[300px]' }, [
        h('p', { class: 'font-medium truncate' }, row.original.name),
        h(
          'p',
          { class: 'text-sm text-muted-foreground truncate' },
          `${row.original.woodType} Wood`,
        ),
        row.original.featured
          ? h(
              Badge,
              {
                variant: 'outline',
                class: 'mt-1 bg-secondary/10 text-secondary border-secondary/20',
              },
              () => 'Featured',
            )
          : null,
      ])
    },
    aggregatedCell: ({ cell }) => {
      const aggregatedValue = cell.getValue()
      return h('div', { class: 'font-semibold' }, aggregatedValue?.toString() || '(Multiple)')
    },
    aggregationFn: 'count',
    enableSorting: true,
    enableHiding: true,
    enableGrouping: true,
    enableColumnFilter: true,
    enableGlobalFilter: true,
    filterFn: 'auto',
    size: 100,
    minSize: 1,
    maxSize: 500,
  },

  // Wood Type Column (with faceting)
  {
    accessorKey: 'woodType',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Wood Type' }),
    cell: ({ row }) => {
      const woodType = row.getValue('woodType') as string
      return h('div', { class: 'flex items-center' }, [
        h('span', { class: 'capitalize' }, woodType),
      ])
    },
    enableSorting: true,
    enableHiding: true,
    enableGrouping: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    size: 120,
    minSize: 1,
    maxSize: 500,
    meta: {
      filterVariant: 'select',
      faceted: true,
    },
  },

  // Category Column (with faceting)
  {
    accessorKey: 'category',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Category' }),
    cell: ({ row }) => {
      const category = row.getValue('category') as string
      const icons: Record<string, any> = {
        'Living Room': Sofa,
        Dining: Utensils,
        Bedroom: Bed,
        Kitchen: ChefHat,
        Office: Briefcase,
        Outdoor: Trees,
      }
      const Icon = icons[category] || Box

      return h('div', { class: 'flex items-center gap-2' }, [
        h(Icon, { class: 'h-4 w-4 text-muted-foreground' }),
        h('span', category),
      ])
    },
    enableSorting: true,
    enableHiding: true,
    enableGrouping: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    size: 90,
    maxSize: 500,

    meta: {
      filterVariant: 'select',
      faceted: true,
    },
  },

  // Price Column (with custom sorting)
  {
    accessorKey: 'price',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Price' }),
    footer: ({ table }) => {
      const total = table.getFilteredRowModel().rows.reduce((sum, row) => {
        const product: any = row.original
        const price = (product.salePrice || product.price || 0) as number
        return sum + price
      }, 0)
      return h('div', { class: 'text-start font-semibold text-right' }, `$${total.toFixed(2)}`)
    },
    cell: ({ row }) => {
      const product = row.original
      const displayPrice = product.salePrice || product.price
      const hasDiscount = !!product.salePrice

      return h('div', { class: 'flex flex-col' }, [
        h('span', { class: 'font-medium' }, `$${displayPrice.toFixed(2)}`),
        hasDiscount &&
          h(
            'span',
            {
              class: 'text-xs text-muted-foreground line-through',
            },
            `$${product.price.toFixed(2)}`,
          ),
      ])
    },
    aggregatedCell: ({ cell }) => {
      const aggregatedValue = cell.getValue()
      const numValue = Number(aggregatedValue)
      return h(
        'div',
        { class: 'font-semibold text-right' },
        `$${isNaN(numValue) ? '0.00' : numValue.toFixed(2)}`,
      )
    },
    aggregationFn: 'sum',
    enableSorting: true,
    enableHiding: true,
    enableGrouping: false,
    enableColumnFilter: true,
    sortingFn: (rowA, rowB) => {
      const priceA = rowA.original.salePrice || rowA.original.price
      const priceB = rowB.original.salePrice || rowB.original.price
      return priceA - priceB
    },
    filterFn: 'inNumberRange',
    size: 120,
    maxSize: 500,

    meta: {
      filterVariant: 'range',
      cellClass: 'tabular-nums',
    },
  },

  // Stock Column (with custom rendering)
  {
    accessorKey: 'stock',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Stock' }),
    footer: ({ table }) => {
      const total = table.getFilteredRowModel().rows.reduce((sum, row) => {
        const product: any = row.original
        const stock = (product.stock || 0) as number
        return sum + stock
      }, 0)
      return h('div', { class: 'text-start font-semibold text-right' }, total.toString())
    },
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      const status = stock > 5 ? 'good' : stock > 0 ? 'low' : 'out'
      const colors = {
        good: 'bg-green-500',
        low: 'bg-yellow-50',
        out: 'bg-red-500',
      }

      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: `w-2 h-2 rounded-full ${colors[status]}` }),
        h('span', { class: 'font-medium tabular-nums' }, stock.toString()),
        stock === 0 &&
          h(
            Badge,
            {
              variant: 'destructive',
              class: 'ml-2 text-xs',
            },
            () => 'Out',
          ),
      ])
    },
    aggregatedCell: ({ cell }) => {
      const aggregatedValue = cell.getValue()
      const numValue = Number(aggregatedValue)
      return h(
        'div',
        { class: 'font-semibold text-right' },
        isNaN(numValue) ? '0' : numValue.toString(),
      )
    },
    aggregationFn: 'sum',
    enableSorting: true,
    enableHiding: true,
    enableGrouping: true,
    enableColumnFilter: true,
    filterFn: 'inNumberRange',
    size: 120,
    maxSize: 500,

    meta: {
      filterVariant: 'range',
    },
  },

  // Status Column (with faceting)
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      const status = row.getValue('status') as Product['status']
      const statusConfig = {
        active: {
          label: 'Active',
          class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          icon: CheckCircle2,
        },
        'out-of-stock': {
          label: 'Out of Stock',
          class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
          icon: XCircle,
        },
        discontinued: {
          label: 'Discontinued',
          class: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
          icon: MinusCircle,
        },
      }

      const config = statusConfig[status]
      return h(Badge, { class: config.class }, () => [
        h(config.icon, { class: 'mr-1 h-3 w-3' }),
        config.label,
      ])
    },
    enableSorting: true,
    enableHiding: true,
    enableGrouping: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    size: 140,
    maxSize: 500,

    meta: {
      filterVariant: 'select',
      faceted: true,
    },
  },

  // Featured Column (hidden by default)
  {
    accessorKey: 'featured',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Featured' }),
    cell: ({ row }) => {
      const featured = row.getValue('featured') as boolean
      return h('div', { class: 'text-center' }, [
        featured
          ? h(Star, { class: 'h-4 w-4 text-yellow-500 fill-yellow-500 inline' })
          : h(StarOff, { class: 'h-4 w-4 text-muted-foreground inline' }),
      ])
    },
    enableSorting: true,
    enableHiding: true,
    enableGrouping: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      if (value === 'all') return true
      return row.getValue(id) === (value === 'true')
    },
    size: 100,
    maxSize: 500,

    meta: {
      filterVariant: 'select',
    },
  },

  // Actions Column
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const product = row.original
      const router = useRouter()

      return h('div', { class: 'flex items-center gap-2' }, [
        // Quick actions
        h(
          Button,
          {
            variant: 'ghost',
            size: 'icon',
            class: 'h-8 w-8',
            onClick: (e: Event) => {
              e.stopPropagation()
              row.pin(row.getIsPinned() === 'top' ? 'bottom' : 'top')
            },
          },
          () => h(row.getIsPinned() ? PinOff : Pin, { class: 'h-4 w-4' }),
        ),

        // Dropdown menu
        h(
          DropdownMenu,
          {},
          {
            default: () => [
              h(
                DropdownMenuTrigger,
                { asChild: true },
                {
                  default: () =>
                    h(
                      Button,
                      {
                        variant: 'ghost',
                        size: 'icon',
                        class: 'h-8 w-8',
                        onClick: (e: Event) => e.stopPropagation(),
                      },
                      () => [
                        h(MoreHorizontal, { class: 'h-4 w-4' }),
                        h('span', { class: 'sr-only' }, 'Open menu'),
                      ],
                    ),
                },
              ),
              h(
                DropdownMenuContent,
                { align: 'end' },
                {
                  default: () => [
                    h(DropdownMenuLabel, {}, () => 'Actions'),
                    h(
                      DropdownMenuItem,
                      {
                        onClick: () => router.push(`/products/${product.id}`),
                      },
                      () => [h(Eye, { class: 'h-4 w-4 mr-2' }), 'View'],
                    ),
                    h(
                      DropdownMenuItem,
                      {
                        onClick: () => router.push(`/products/${product.id}/edit`),
                      },
                      () => [h(Edit, { class: 'h-4 w-4 mr-2' }), 'Edit'],
                    ),
                    h(
                      DropdownMenuItem,
                      {
                        onClick: () => {
                          navigator.clipboard.writeText(product.id.toString())
                        },
                      },
                      () => [h(Copy, { class: 'h-4 w-4 mr-2' }), 'Copy ID'],
                    ),
                    h(DropdownMenuSeparator),
                    h(
                      DropdownMenuItem,
                      {
                        onClick: () => row.toggleExpanded(),
                      },
                      () => [
                        h(row.getIsExpanded() ? ChevronUp : ChevronDown, {
                          class: 'h-4 w-4 mr-2',
                        }),
                        row.getIsExpanded() ? 'Collapse' : 'Expand',
                      ],
                    ),
                    h(DropdownMenuSeparator),
                    h(
                      DropdownMenuItem,
                      {
                        class: 'text-red-600',
                        onClick: () => {
                          // Emit delete event
                          console.log('Delete product:', product.id)
                        },
                      },
                      () => [h(Trash2, { class: 'h-4 w-4 mr-2' }), 'Delete'],
                    ),
                  ],
                },
              ),
            ],
          },
        ),
      ])
    },
    enableHiding: false,
    enablePinning: true,
    size: 100,
    minSize: 100,
    maxSize: 500,
    meta: {
      disableDragging: true,
    },
  },
]
