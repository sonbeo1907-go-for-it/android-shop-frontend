"use client";

import { useState } from "react";
import {
  Banknote,
  CreditCard,
  PackageSearch,
  Search,
  Trash2,
} from "lucide-react";

import {
  Badge,
  Breadcrumb,
  Button,
  Container,
  ContentSection,
  Drawer,
  EmptyState,
  ErrorState,
  IconButton,
  Input,
  Modal,
  Pagination,
  PhoneGridSkeleton,
  Price,
  QuantitySelector,
  RadioCard,
  SectionHeader,
  Select,
  Textarea,
} from "@/components/ui";

export default function UiTestPage() {
  const [page, setPage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("COD");
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main className="py-8">
      <Container className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Kiểm tra UI" },
          ]}
        />

        <ContentSection>
          <SectionHeader
            title="Component UI cơ bản"
            subtitle="Trang kiểm tra không chứa nghiệp vụ Phone, Cart hoặc Order."
            actionLabel="Về trang chủ"
            actionHref="/"
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" leftIcon={<Trash2 className="size-4" />}>
              Danger
            </Button>
            <Button loading>Đang xử lý</Button>
            <IconButton
              icon={<Search className="size-5" />}
              label="Tìm kiếm"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Input
              label="Từ khóa"
              placeholder="Nhập nội dung"
              leftIcon={<Search className="size-4" />}
              hint="Input nhận props và forwardRef."
            />

            <Select
              label="Sắp xếp"
              placeholder="Chọn giá trị"
              defaultValue=""
              options={[
                { value: "newest", label: "Mới nhất" },
                { value: "price-asc", label: "Giá tăng dần" },
              ]}
            />

            <Textarea
              label="Ghi chú"
              placeholder="Nhập ghi chú"
              maxLength={200}
            />

            <div>
              <p className="mb-2 text-sm font-semibold">Số lượng</p>
              <QuantitySelector
                value={quantity}
                min={1}
                max={10}
                onChange={setQuantity}
              />
            </div>
          </div>

          <div className="mt-6">
            <Price
              value={33_725_000}
              originalValue={36_990_000}
              size="lg"
            />
          </div>
        </ContentSection>

        <ContentSection>
          <SectionHeader title="Radio card" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <RadioCard
              name="payment"
              value="COD"
              checked={payment === "COD"}
              title="Thanh toán khi nhận hàng"
              description="Kiểm tra component RadioCard dùng props."
              icon={<Banknote className="size-5" />}
              onChange={setPayment}
            />
            <RadioCard
              name="payment"
              value="QR_TRANSFER"
              checked={payment === "QR_TRANSFER"}
              title="Chuyển khoản QR"
              description="Đây chỉ là nội dung kiểm tra giao diện."
              icon={<CreditCard className="size-5" />}
              onChange={setPayment}
            />
          </div>
        </ContentSection>

        <ContentSection>
          <SectionHeader title="Pagination, Modal và Drawer" />
          <div className="mt-5 space-y-5">
            <Pagination page={page} totalPages={12} onPageChange={setPage} />
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => setModalOpen(true)}>
                Mở Modal
              </Button>
              <Button variant="outline" onClick={() => setDrawerOpen(true)}>
                Mở Drawer
              </Button>
            </div>
          </div>
        </ContentSection>

        <EmptyState
          title="Chưa có dữ liệu"
          description="EmptyState có thể nhận icon, link hành động hoặc children."
          icon={<PackageSearch className="size-8" />}
          actionLabel="Quay lại trang chủ"
          actionHref="/"
        />

        <ErrorState
          message="Đây là trạng thái lỗi dùng để kiểm tra giao diện."
          onRetry={() => undefined}
        />

        <ContentSection>
          <SectionHeader title="Skeleton" />
          <div className="mt-5">
            <PhoneGridSkeleton count={4} />
          </div>
        </ContentSection>
      </Container>

      <Modal
        open={modalOpen}
        title="Modal kiểm tra"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Đóng
            </Button>
            <Button onClick={() => setModalOpen(false)}>Xác nhận</Button>
          </div>
        }
        onClose={() => setModalOpen(false)}
      >
        <p className="text-sm leading-6 text-muted">
          Nội dung Modal được truyền qua children. Footer cũng được truyền bằng props.
        </p>
      </Modal>

      <Drawer
        open={drawerOpen}
        title="Drawer kiểm tra"
        side="right"
        footer={
          <Button fullWidth onClick={() => setDrawerOpen(false)}>
            Hoàn tất
          </Button>
        }
        onClose={() => setDrawerOpen(false)}
      >
        <div className="space-y-3 text-sm leading-6 text-muted">
          <p>Drawer nhận vị trí left, right hoặc bottom.</p>
          <p>Nội dung được truyền qua children và không chứa nghiệp vụ cố định.</p>
        </div>
      </Drawer>
    </main>
  );
}
