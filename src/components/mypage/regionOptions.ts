export type DistrictOption = {
  id: number;
  name: string;
};

export type RegionOption = {
  city: string;
  districts: DistrictOption[];
};

// Source: C:/Users/O2/Downloads/allplay_region.csv
// NOTE: Temporary region list generated from CSV. Replace when region API/DB is connected.
export const REGION_OPTIONS: RegionOption[] = [
  {
    city: "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc",
    districts: [
      { id: 1, name: "\uc885\ub85c\uad6c" },
      { id: 2, name: "\uc911\uad6c" },
      { id: 3, name: "\uc6a9\uc0b0\uad6c" },
      { id: 4, name: "\uc131\ub3d9\uad6c" },
      { id: 5, name: "\uad11\uc9c4\uad6c" },
      { id: 6, name: "\ub3d9\ub300\ubb38\uad6c" },
      { id: 7, name: "\uc911\ub791\uad6c" },
      { id: 8, name: "\uc131\ubd81\uad6c" },
      { id: 9, name: "\uac15\ubd81\uad6c" },
      { id: 10, name: "\ub3c4\ubd09\uad6c" },
      { id: 11, name: "\ub178\uc6d0\uad6c" },
      { id: 12, name: "\uc740\ud3c9\uad6c" },
      { id: 13, name: "\uc11c\ub300\ubb38\uad6c" },
      { id: 14, name: "\ub9c8\ud3ec\uad6c" },
      { id: 15, name: "\uc591\ucc9c\uad6c" },
      { id: 16, name: "\uac15\uc11c\uad6c" },
      { id: 17, name: "\uad6c\ub85c\uad6c" },
      { id: 18, name: "\uae08\ucc9c\uad6c" },
      { id: 19, name: "\uc601\ub4f1\ud3ec\uad6c" },
      { id: 20, name: "\ub3d9\uc791\uad6c" },
      { id: 21, name: "\uad00\uc545\uad6c" },
      { id: 22, name: "\uc11c\ucd08\uad6c" },
      { id: 23, name: "\uac15\ub0a8\uad6c" },
      { id: 24, name: "\uc1a1\ud30c\uad6c" },
      { id: 25, name: "\uac15\ub3d9\uad6c" }
    ]
  },
  {
    city: "\ubd80\uc0b0\uad11\uc5ed\uc2dc",
    districts: [
      { id: 26, name: "\uc911\uad6c" },
      { id: 27, name: "\uc11c\uad6c" },
      { id: 28, name: "\ub3d9\uad6c" },
      { id: 29, name: "\uc601\ub3c4\uad6c" },
      { id: 30, name: "\ubd80\uc0b0\uc9c4\uad6c" },
      { id: 31, name: "\ub3d9\ub798\uad6c" },
      { id: 32, name: "\ub0a8\uad6c" },
      { id: 33, name: "\ubd81\uad6c" },
      { id: 34, name: "\ud574\uc6b4\ub300\uad6c" },
      { id: 35, name: "\uc0ac\ud558\uad6c" },
      { id: 36, name: "\uae08\uc815\uad6c" },
      { id: 37, name: "\uac15\uc11c\uad6c" },
      { id: 38, name: "\uc5f0\uc81c\uad6c" },
      { id: 39, name: "\uc218\uc601\uad6c" },
      { id: 40, name: "\uc0ac\uc0c1\uad6c" },
      { id: 41, name: "\uae30\uc7a5\uad70" }
    ]
  },
  {
    city: "\ub300\uad6c\uad11\uc5ed\uc2dc",
    districts: [
      { id: 42, name: "\uc911\uad6c" },
      { id: 43, name: "\ub3d9\uad6c" },
      { id: 44, name: "\uc11c\uad6c" },
      { id: 45, name: "\ub0a8\uad6c" },
      { id: 46, name: "\ubd81\uad6c" },
      { id: 47, name: "\uc218\uc131\uad6c" },
      { id: 48, name: "\ub2ec\uc11c\uad6c" },
      { id: 49, name: "\ub2ec\uc131\uad70" },
      { id: 50, name: "\uad70\uc704\uad70" }
    ]
  },
  {
    city: "\uc778\ucc9c\uad11\uc5ed\uc2dc",
    districts: [
      { id: 51, name: "\uc911\uad6c" },
      { id: 52, name: "\ub3d9\uad6c" },
      { id: 53, name: "\ubbf8\ucd94\ud640\uad6c" },
      { id: 54, name: "\uc5f0\uc218\uad6c" },
      { id: 55, name: "\ub0a8\ub3d9\uad6c" },
      { id: 56, name: "\ubd80\ud3c9\uad6c" },
      { id: 57, name: "\uacc4\uc591\uad6c" },
      { id: 58, name: "\uc11c\uad6c" },
      { id: 59, name: "\uac15\ud654\uad70" },
      { id: 60, name: "\uc639\uc9c4\uad70" }
    ]
  },
  {
    city: "\uad11\uc8fc\uad11\uc5ed\uc2dc",
    districts: [
      { id: 61, name: "\ub3d9\uad6c" },
      { id: 62, name: "\uc11c\uad6c" },
      { id: 63, name: "\ub0a8\uad6c" },
      { id: 64, name: "\ubd81\uad6c" },
      { id: 65, name: "\uad11\uc0b0\uad6c" }
    ]
  },
  {
    city: "\ub300\uc804\uad11\uc5ed\uc2dc",
    districts: [
      { id: 66, name: "\ub3d9\uad6c" },
      { id: 67, name: "\uc911\uad6c" },
      { id: 68, name: "\uc11c\uad6c" },
      { id: 69, name: "\uc720\uc131\uad6c" },
      { id: 70, name: "\ub300\ub355\uad6c" }
    ]
  },
  {
    city: "\uc6b8\uc0b0\uad11\uc5ed\uc2dc",
    districts: [
      { id: 71, name: "\uc911\uad6c" },
      { id: 72, name: "\ub0a8\uad6c" },
      { id: 73, name: "\ub3d9\uad6c" },
      { id: 74, name: "\ubd81\uad6c" },
      { id: 75, name: "\uc6b8\uc8fc\uad70" }
    ]
  },
  {
    city: "\uc138\uc885\uc2dc",
    districts: [{ id: 76, name: "\uc138\uc885\uc2dc" }]
  },
  {
    city: "\uacbd\uae30\ub3c4",
    districts: [
      { id: 77, name: "\uc218\uc6d0\uc2dc" },
      { id: 78, name: "\uc131\ub0a8\uc2dc" },
      { id: 79, name: "\uc758\uc815\ubd80\uc2dc" },
      { id: 80, name: "\uc548\uc591\uc2dc" },
      { id: 81, name: "\ubd80\ucc9c\uc2dc" },
      { id: 82, name: "\uad11\uba85\uc2dc" },
      { id: 83, name: "\ud3c9\ud0dd\uc2dc" },
      { id: 84, name: "\ub3d9\ub450\ucc9c\uc2dc" },
      { id: 85, name: "\uc548\uc0b0\uc2dc" },
      { id: 86, name: "\uace0\uc591\uc2dc" },
      { id: 87, name: "\uacfc\ucc9c\uc2dc" },
      { id: 88, name: "\uad6c\ub9ac\uc2dc" },
      { id: 89, name: "\ub0a8\uc591\uc8fc\uc2dc" },
      { id: 90, name: "\uc624\uc0b0\uc2dc" },
      { id: 91, name: "\uc2dc\ud765\uc2dc" },
      { id: 92, name: "\uad70\ud3ec\uc2dc" },
      { id: 93, name: "\uc758\uc655\uc2dc" },
      { id: 94, name: "\ud558\ub0a8\uc2dc" },
      { id: 95, name: "\uc6a9\uc778\uc2dc" },
      { id: 96, name: "\ud30c\uc8fc\uc2dc" },
      { id: 97, name: "\uc774\ucc9c\uc2dc" },
      { id: 98, name: "\uc548\uc131\uc2dc" },
      { id: 99, name: "\uae40\ud3ec\uc2dc" },
      { id: 100, name: "\ud654\uc131\uc2dc" },
      { id: 101, name: "\uad11\uc8fc\uc2dc" },
      { id: 102, name: "\uc591\uc8fc\uc2dc" },
      { id: 103, name: "\ud3ec\ucc9c\uc2dc" },
      { id: 104, name: "\uc5ec\uc8fc\uc2dc" },
      { id: 105, name: "\uc5f0\ucc9c\uad70" },
      { id: 106, name: "\uac00\ud3c9\uad70" },
      { id: 107, name: "\uc591\ud3c9\uad70" }
    ]
  },
  {
    city: "\uac15\uc6d0\ub3c4",
    districts: [
      { id: 108, name: "\ucd98\ucc9c\uc2dc" },
      { id: 109, name: "\uc6d0\uc8fc\uc2dc" },
      { id: 110, name: "\uac15\ub989\uc2dc" },
      { id: 111, name: "\ub3d9\ud574\uc2dc" },
      { id: 112, name: "\ud0dc\ubc31\uc2dc" },
      { id: 113, name: "\uc18d\ucd08\uc2dc" },
      { id: 114, name: "\uc0bc\ucc99\uc2dc" },
      { id: 115, name: "\ud64d\ucc9c\uad70" },
      { id: 116, name: "\ud6a1\uc131\uad70" },
      { id: 117, name: "\uc601\uc6d4\uad70" },
      { id: 118, name: "\ud3c9\ucc3d\uad70" },
      { id: 119, name: "\uc815\uc120\uad70" },
      { id: 120, name: "\ucca0\uc6d0\uad70" },
      { id: 121, name: "\ud654\ucc9c\uad70" },
      { id: 122, name: "\uc591\uad6c\uad70" },
      { id: 123, name: "\uc778\uc81c\uad70" },
      { id: 124, name: "\uace0\uc131\uad70" },
      { id: 125, name: "\uc591\uc591\uad70" }
    ]
  },
  {
    city: "\ucda9\uccad\ubd81\ub3c4",
    districts: [
      { id: 126, name: "\uccad\uc8fc\uc2dc" },
      { id: 127, name: "\ucda9\uc8fc\uc2dc" },
      { id: 128, name: "\uc81c\ucc9c\uc2dc" },
      { id: 129, name: "\ubcf4\uc740\uad70" },
      { id: 130, name: "\uc625\ucc9c\uad70" },
      { id: 131, name: "\uc601\ub3d9\uad70" },
      { id: 132, name: "\uc99d\ud3c9\uad70" },
      { id: 133, name: "\uc9c4\ucc9c\uad70" },
      { id: 134, name: "\uad34\uc0b0\uad70" },
      { id: 135, name: "\uc74c\uc131\uad70" },
      { id: 136, name: "\ub2e8\uc591\uad70" }
    ]
  },
  {
    city: "\ucda9\uccad\ub0a8\ub3c4",
    districts: [
      { id: 137, name: "\ucc9c\uc548\uc2dc" },
      { id: 138, name: "\uacf5\uc8fc\uc2dc" },
      { id: 139, name: "\ubcf4\ub839\uc2dc" },
      { id: 140, name: "\uc544\uc0b0\uc2dc" },
      { id: 141, name: "\uc11c\uc0b0\uc2dc" },
      { id: 142, name: "\ub17c\uc0b0\uc2dc" },
      { id: 143, name: "\uacc4\ub8e1\uc2dc" },
      { id: 144, name: "\ub2f9\uc9c4\uc2dc" },
      { id: 145, name: "\uae08\uc0b0\uad70" },
      { id: 146, name: "\ubd80\uc5ec\uad70" },
      { id: 147, name: "\uc11c\ucc9c\uad70" },
      { id: 148, name: "\uccad\uc591\uad70" },
      { id: 149, name: "\ud64d\uc131\uad70" },
      { id: 150, name: "\uc608\uc0b0\uad70" },
      { id: 151, name: "\ud0dc\uc548\uad70" }
    ]
  },
  {
    city: "\uc804\ub77c\ubd81\ub3c4",
    districts: [
      { id: 152, name: "\uc804\uc8fc\uc2dc" },
      { id: 153, name: "\uad70\uc0b0\uc2dc" },
      { id: 154, name: "\uc775\uc0b0\uc2dc" },
      { id: 155, name: "\uc815\uc74d\uc2dc" },
      { id: 156, name: "\ub0a8\uc6d0\uc2dc" },
      { id: 157, name: "\uae40\uc81c\uc2dc" },
      { id: 158, name: "\uc644\uc8fc\uad70" },
      { id: 159, name: "\uc9c4\uc548\uad70" },
      { id: 160, name: "\ubb34\uc8fc\uad70" },
      { id: 161, name: "\uc7a5\uc218\uad70" },
      { id: 162, name: "\uc784\uc2e4\uad70" },
      { id: 163, name: "\uc21c\ucc3d\uad70" },
      { id: 164, name: "\uace0\ucc3d\uad70" },
      { id: 165, name: "\ubd80\uc548\uad70" }
    ]
  },
  {
    city: "\uc804\ub77c\ub0a8\ub3c4",
    districts: [
      { id: 166, name: "\ubaa9\ud3ec\uc2dc" },
      { id: 167, name: "\uc5ec\uc218\uc2dc" },
      { id: 168, name: "\uc21c\ucc9c\uc2dc" },
      { id: 169, name: "\ub098\uc8fc\uc2dc" },
      { id: 170, name: "\uad11\uc591\uc2dc" },
      { id: 171, name: "\ub2f4\uc591\uad70" },
      { id: 172, name: "\uace1\uc131\uad70" },
      { id: 173, name: "\uad6c\ub840\uad70" },
      { id: 174, name: "\uace0\ud765\uad70" },
      { id: 175, name: "\ubcf4\uc131\uad70" },
      { id: 176, name: "\ud654\uc21c\uad70" },
      { id: 177, name: "\uc7a5\ud765\uad70" },
      { id: 178, name: "\uac15\uc9c4\uad70" },
      { id: 179, name: "\ud574\ub0a8\uad70" },
      { id: 180, name: "\uc601\uc554\uad70" },
      { id: 181, name: "\ubb34\uc548\uad70" },
      { id: 182, name: "\ud568\ud3c9\uad70" },
      { id: 183, name: "\uc601\uad11\uad70" },
      { id: 184, name: "\uc7a5\uc131\uad70" },
      { id: 185, name: "\uc644\ub3c4\uad70" },
      { id: 186, name: "\uc9c4\ub3c4\uad70" },
      { id: 199, name: "\uc2e0\uc548\uad70" }
    ]
  },
  {
    city: "\uacbd\uc0c1\ubd81\ub3c4",
    districts: [
      { id: 200, name: "\ud3ec\ud56d\uc2dc \ub0a8\uad6c" },
      { id: 201, name: "\ud3ec\ud56d\uc2dc \ubd81\uad6c" },
      { id: 202, name: "\uacbd\uc8fc\uc2dc" },
      { id: 203, name: "\uae40\ucc9c\uc2dc" },
      { id: 204, name: "\uc548\ub3d9\uc2dc" },
      { id: 205, name: "\uad6c\ubbf8\uc2dc" },
      { id: 206, name: "\uc601\uc8fc\uc2dc" },
      { id: 207, name: "\uc601\ucc9c\uc2dc" },
      { id: 208, name: "\uc0c1\uc8fc\uc2dc" },
      { id: 209, name: "\ubb38\uacbd\uc2dc" },
      { id: 210, name: "\uacbd\uc0b0\uc2dc" },
      { id: 211, name: "\uc758\uc131\uad70" },
      { id: 212, name: "\uccad\uc1a1\uad70" },
      { id: 213, name: "\uc601\uc591\uad70" },
      { id: 214, name: "\uc601\ub355\uad70" },
      { id: 215, name: "\uccad\ub3c4\uad70" },
      { id: 216, name: "\uace0\ub839\uad70" },
      { id: 217, name: "\uc131\uc8fc\uad70" },
      { id: 218, name: "\uce60\uace1\uad70" },
      { id: 219, name: "\uc608\ucc9c\uad70" },
      { id: 220, name: "\ubd09\ud654\uad70" },
      { id: 221, name: "\uc6b8\uc9c4\uad70" },
      { id: 222, name: "\uc6b8\ub989\uad70" }
    ]
  },
  {
    city: "\uacbd\uc0c1\ub0a8\ub3c4",
    districts: [
      { id: 223, name: "\ucc3d\uc6d0\uc2dc \uc758\ucc3d\uad6c" },
      { id: 224, name: "\ucc3d\uc6d0\uc2dc \uc131\uc0b0\uad6c" },
      { id: 225, name: "\ucc3d\uc6d0\uc2dc \ub9c8\uc0b0\ud569\ud3ec\uad6c" },
      { id: 226, name: "\ucc3d\uc6d0\uc2dc \ub9c8\uc0b0\ud68c\uc6d0\uad6c" },
      { id: 227, name: "\ucc3d\uc6d0\uc2dc \uc9c4\ud574\uad6c" },
      { id: 228, name: "\uc9c4\uc8fc\uc2dc" },
      { id: 229, name: "\ud1b5\uc601\uc2dc" },
      { id: 230, name: "\uc0ac\ucc9c\uc2dc" },
      { id: 231, name: "\uae40\ud574\uc2dc" },
      { id: 232, name: "\ubc00\uc591\uc2dc" },
      { id: 233, name: "\uac70\uc81c\uc2dc" },
      { id: 234, name: "\uc591\uc0b0\uc2dc" },
      { id: 235, name: "\uc758\ub839\uad70" },
      { id: 236, name: "\ud568\uc548\uad70" },
      { id: 237, name: "\ucc3d\ub155\uad70" },
      { id: 238, name: "\uace0\uc131\uad70" },
      { id: 239, name: "\ub0a8\ud574\uad70" },
      { id: 240, name: "\ud558\ub3d9\uad70" },
      { id: 241, name: "\uc0b0\uccad\uad70" },
      { id: 242, name: "\ud568\uc591\uad70" },
      { id: 243, name: "\uac70\ucc3d\uad70" },
      { id: 244, name: "\ud569\ucc9c\uad70" }
    ]
  },
  {
    city: "\uc81c\uc8fc\ud2b9\ubcc4\uc790\uce58\ub3c4",
    districts: [
      { id: 245, name: "\uc81c\uc8fc\uc2dc" },
      { id: 246, name: "\uc11c\uadc0\ud3ec\uc2dc" }
    ]
  }
];
