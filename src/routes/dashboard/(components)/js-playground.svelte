<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';

	let value = `/* eslint-disable no-param-reassign */
/**
 *
 * @param {ImportIO.Group[]} data
 * @returns {ImportIO.Group[]}
 */
const cleanUp = (data) => {
	const mapping = {
		number: text => text.replace(',', '.'),
	};
	
    const convertToDate = (str) => {
		data.forEach(obj => obj.group.forEach(row => Object.keys(row).forEach((header) => {
    		// eslint-disable-next-line no-param-reassign
    		if (mapping[header]) row[header] = mappingFct(header, row[header], row);
  		})));

  		return data;
	}
};
`;
</script>

<CodeMirror bind:value lang={javascript()} />
