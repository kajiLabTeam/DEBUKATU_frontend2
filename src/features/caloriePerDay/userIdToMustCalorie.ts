//model_idからそれに対応する最新のweightを取得、created_date同士の差を期間から引いて計算する
//model_idから取得したweight,最新のweight_idから取得したweight, ↑で計算した残り期間をcaloriePerDayに代入

import { getCurrentModel } from "../../api/getCurrentModelData";
import { getCurrentWeight } from "../../api/getCurrentWeightData";
import { caloriePerDay } from "./caloriePerDay";

export async function getMustCalorie(userId: string): Promise<number> {
    //最新Model_Data取得
    const model = await getCurrentModel(userId);
    const { ModelId, ModelWeight, LengthOfDays, CreatedDate: modelCreatedDate } = model;

    //対応するWeight_Dataのうち最新のものを取得
    const weight = await getCurrentWeight(userId, ModelId);
    const { CurrentWeight, CreatedDate: weightCreatedDate } = weight;

    const modelDate = new Date(modelCreatedDate);
    const weightDate = new Date(weightCreatedDate);

    // 差分（ミリ秒）を計算
    const diffMs = weightDate.getTime() - modelDate.getTime();

    // ミリ秒 → 日に変換（1日 = 1000 * 60 * 60 * 24）
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const days = LengthOfDays - diffDays;

    console.log(modelDate, weightDate, diffDays);
    const mustPerCalorie = caloriePerDay(ModelWeight, CurrentWeight, days);
    return mustPerCalorie;
}