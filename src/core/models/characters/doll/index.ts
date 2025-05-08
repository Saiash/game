import {
  bodyPartsList,
} from './types';
import { BaseEntityModel } from '../../../engine/models/entity/models';
import { DataStore } from '../../../engine/models/store/store';
import { BodyPart } from './bodyPart';
import { DollHead } from './models/head';
import { DollNeck } from './models/neck';
import { Character } from '..';
import { DollLeftLeg } from './models/leftLeg';
import { DollRightLeg } from './models/rightLeg';
import { DollRightArm } from './models/rightArm';
import { DollLeftFoot } from './models/leftFoot';
import { DollRightPalm } from './models/rightPalm';
import { DollLeftPalm } from './models/leftPalm';
import { DollRightFoot } from './models/rightFoot';
import { DollBack } from './models/back';
import { DollTorso } from './models/torso';
import { DollLeftShoulder } from './models/leftShoulder';
import { DollRightShoulder } from './models/rightShoulder';
import { DollLeftElbow } from './models/leftElbow';
import { DollRightElbow } from './models/rightElbow';
import { DollLeftWrist } from './models/leftWrist';
import { DollRightWrist } from './models/rightWrist';
import { DollBelly } from './models/belly';
import { DollChest } from './models/chest';
import { DollBelt } from './models/belt';
import { DollPelvis } from './models/pelvis';
import { DollAmmo } from './models/ammo';
import { DollBackpack } from './models/backpack';
import { DollRightTool } from './models/rightTool';
import { DollLeftTool } from './models/leftTool';
import { DollSkull } from './models/skull';
import { DollLeftEye } from './models/leftEye';
import { DollRightEye } from './models/rightEye';
import { DollLeftEar } from './models/leftEar';
import { DollRightEar } from './models/rightEar';
import { DollMouth } from './models/mouth';
import { DollTongue } from './models/tongue';
import { DollNose } from './models/nose';
import { DollFace } from './models/face';
import { DollEyes } from './models/eyes';
import { DollEars } from './models/ears';
import { DollHat } from './models/hat';
import { DollVitals } from './models/vitals';
import { DollLeftUpperArm } from './models/leftUpperArm';
import { DollRightUpperArm } from './models/rightUpperArm';
import { DollRightForearm } from './models/rightForearm';
import { DollLeftThigh } from './models/leftThigh';
import { DollRightThigh } from './models/rightThigh';
import { DollLeftKnee } from './models/leftKnee';
import { DollRightKnee } from './models/rightKnee';
import { DollLeftShin } from './models/leftShin';
import { DollRightShin } from './models/rightShin';
import { DollLeftForearm } from './models/leftForearm';
import { DollLeftArm } from './models/leftArm';

const BODY_PART_MODELS: Record<bodyPartsList, typeof BodyPart> = {
  head: DollHead,
  neck: DollNeck,
  torso: DollTorso,
  leftLeg: DollLeftLeg,
  rightLeg: DollRightLeg,
  leftArm: DollLeftArm,
  rightArm: DollRightArm,
  leftFoot: DollLeftFoot,
  rightFoot: DollRightFoot,
  leftPalm: DollLeftPalm,
  rightPalm: DollRightPalm,
  back: DollBack,
  leftShoulder: DollLeftShoulder,
  rightShoulder: DollRightShoulder,
  leftElbow: DollLeftElbow,
  rightElbow: DollRightElbow,
  leftWrist: DollLeftWrist,
  rightWrist: DollRightWrist,
  belly: DollBelly,
  chest: DollChest,
  belt: DollBelt,
  pelvis: DollPelvis,
  leftThigh: DollLeftThigh,
  rightThigh: DollRightThigh,
  leftKnee: DollLeftKnee,
  rightKnee: DollRightKnee,
  leftShin: DollLeftShin,
  rightShin: DollRightShin,
  ammo: DollAmmo,
  backpack: DollBackpack,
  rightTool: DollRightTool,
  leftTool: DollLeftTool,
  skull: DollSkull,
  leftEye: DollLeftEye,
  rightEye: DollRightEye,
  leftEar: DollLeftEar,
  rightEar: DollRightEar,
  mouth: DollMouth,
  tongue: DollTongue,
  nose: DollNose,
  face: DollFace,
  eyes: DollEyes,
  ears: DollEars,
  hat: DollHat,
  vitals: DollVitals,
  leftUpperArm: DollLeftUpperArm,
  rightUpperArm: DollRightUpperArm,
  leftForearm: DollLeftForearm,
  rightForearm: DollRightForearm,
}

export class CharacterDoll extends BaseEntityModel {
  private collection = new Map<bodyPartsList, BodyPart>();

  constructor(store: DataStore, character: Character) {
    super(store, ['doll']);

    Object.entries(BODY_PART_MODELS).forEach(([key, value]) => {
      const newModel = new value({ store, character, path: [key as bodyPartsList] });
      this.collection.set(key as bodyPartsList, newModel);
    });
  }

  getByCode<T = BodyPart>(code: bodyPartsList): T {
    const attr = this.collection.get(code);
    if (!attr) throw new Error(`not propper bodypart key ${code}`);
    return attr as unknown as T;
  }
}
