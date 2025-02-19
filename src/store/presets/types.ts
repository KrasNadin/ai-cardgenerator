export type Pack = DefaultInfo & {
	presets: Preset[];
};

export type Preset = DefaultInfo & {
	frontPrompts: Prompt | null;
	backPrompts: Prompt | null;
};

export type DefaultInfo = {
	id: string;
	title: string;
	description?: string;
};

export type Prompt = {
	text: string;
};
