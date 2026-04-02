import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";

const NotFoundPage = () => {
  return (
    <div className={"text-center"}>
      <h1 className="mt-6 text-8xl font-bold">404</h1>
      <h2 className="mt-6 text-2xl font-semibold">
        {GLOBAL_TEXT.page_not_found}
      </h2>
    </div>
  );
};

export default NotFoundPage;
