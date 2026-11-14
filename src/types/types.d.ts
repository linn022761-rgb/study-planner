type SelectOption = Array<{ label: string; value: string | number }>;

interface ResponseData<T> {
  status: string;
  status_message: string;
  message?: string;
  data: T;
}
