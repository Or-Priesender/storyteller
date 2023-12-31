// @generated by protobuf-ts 2.9.3
// @generated from protobuf file "api.proto" (package "api", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message api.GenerateStoryRequest
 */
export interface GenerateStoryRequest {
    /**
     * @generated from protobuf field: repeated string topics = 1;
     */
    topics: string[];
    /**
     * @generated from protobuf field: optional int32 length = 2;
     */
    length?: number;
}
/**
 * @generated from protobuf message api.GenerateStoryResponse
 */
export interface GenerateStoryResponse {
    /**
     * @generated from protobuf field: repeated string pages = 1;
     */
    pages: string[];
    /**
     * @generated from protobuf field: repeated string images = 2;
     */
    images: string[];
}
// @generated message type with reflection information, may provide speed optimized methods
class GenerateStoryRequest$Type extends MessageType<GenerateStoryRequest> {
    constructor() {
        super("api.GenerateStoryRequest", [
            { no: 1, name: "topics", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "length", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<GenerateStoryRequest>): GenerateStoryRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.topics = [];
        if (value !== undefined)
            reflectionMergePartial<GenerateStoryRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GenerateStoryRequest): GenerateStoryRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string topics */ 1:
                    message.topics.push(reader.string());
                    break;
                case /* optional int32 length */ 2:
                    message.length = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GenerateStoryRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated string topics = 1; */
        for (let i = 0; i < message.topics.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.topics[i]);
        /* optional int32 length = 2; */
        if (message.length !== undefined)
            writer.tag(2, WireType.Varint).int32(message.length);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message api.GenerateStoryRequest
 */
export const GenerateStoryRequest = new GenerateStoryRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GenerateStoryResponse$Type extends MessageType<GenerateStoryResponse> {
    constructor() {
        super("api.GenerateStoryResponse", [
            { no: 1, name: "pages", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "images", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GenerateStoryResponse>): GenerateStoryResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.pages = [];
        message.images = [];
        if (value !== undefined)
            reflectionMergePartial<GenerateStoryResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GenerateStoryResponse): GenerateStoryResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string pages */ 1:
                    message.pages.push(reader.string());
                    break;
                case /* repeated string images */ 2:
                    message.images.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GenerateStoryResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated string pages = 1; */
        for (let i = 0; i < message.pages.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.pages[i]);
        /* repeated string images = 2; */
        for (let i = 0; i < message.images.length; i++)
            writer.tag(2, WireType.LengthDelimited).string(message.images[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message api.GenerateStoryResponse
 */
export const GenerateStoryResponse = new GenerateStoryResponse$Type();
/**
 * @generated ServiceType for protobuf service api.StoryGenerator
 */
export const StoryGenerator = new ServiceType("api.StoryGenerator", [
    { name: "GenerateStory", options: {}, I: GenerateStoryRequest, O: GenerateStoryResponse }
]);
