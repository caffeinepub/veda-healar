import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface VeduMessage {
    id: bigint;
    skipQuestions: Array<string>;
    text: string;
    hasCallback: boolean;
    intent: string;
    details?: string;
    externalEndpoint?: string;
    nextQuestion?: string;
    options: Array<string>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    getAllMessages(): Promise<Array<VeduMessage>>;
    getBookingSteps(): Promise<{
        flowIndex: bigint;
        questions: Array<string>;
    }>;
    getMessage(messageId: bigint): Promise<VeduMessage | null>;
    getVeduData(): Promise<{
        messages: Array<VeduMessage>;
        bookingQuestions: Array<VeduMessage>;
    }>;
    initializeMessages(): Promise<void>;
    processBookingResponse(userId: string, response: string): Promise<{
        completed: boolean;
        summary?: string;
        nextQuestion?: string;
    }>;
    startBookingSession(userId: string): Promise<bigint>;
    submitBooking(formData: Array<string>): Promise<string>;
    submitSingleBooking(formData: Array<string>): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
