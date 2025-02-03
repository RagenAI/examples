import { MessagesList } from "../messages-list/messages-list";
import { QuestionForm } from "../question-form/question-form";

export function Assistant() {
  return (
    <>
      <div className="flex-1 overflow-y-auto mx-6">
        <MessagesList />
      </div>

      <div className="flex m-4 mx-6">
        <QuestionForm />
      </div>
    </>
  );
}
